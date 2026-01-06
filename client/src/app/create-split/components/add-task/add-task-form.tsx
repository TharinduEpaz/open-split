import { FieldInfo } from '@/components/form/field-info'
import { FilledButton } from '@/components/ui/common/filled-button'
import { OutlinedButton } from '@/components/ui/common/outlined-button'
import { useLoadingBar } from '@/hooks/use-loading-bar'
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import type { AnyFieldApi } from '@tanstack/react-form'
import { useForm } from '@tanstack/react-form'
import { PlusIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useCreateSplit } from '../../state/use-create-split'
import { TaskChip } from './task-chip'

interface AddTaskFormProps {
  onDeleteTask: (taskName: string) => void
}

export default function AddTaskForm({ onDeleteTask }: AddTaskFormProps) {
  const [multiplePeople, setMultiplePeople] = useState(false)
  const { createSplitData, setCreateSplitData } = useCreateSplit()
  const { start: startLoading, complete: completeLoading } = useLoadingBar()
  const form = useForm({
    defaultValues: {
      taskName: '',
      amount: '',
      responsiblePeople: [{ personId: '', amount: '' }],
    },
    onSubmit: async ({ value }) => {
      startLoading()
      try {
        // Validate the total amount with the sum of the responsible people amounts
        const totalAmount = Number(value.amount) || 0
        const sumOfPeopleAmounts = value.responsiblePeople.reduce(
          (acc, person) => acc + Number(person.amount || 0),
          0,
        )
        if (multiplePeople && totalAmount !== sumOfPeopleAmounts) {
          toast.error('The total amount does not match the sum of the responsible people amounts')
          return
        }

        const dataToSave = {
          taskName: value.taskName,
          amount: totalAmount,
          people: value.responsiblePeople.map((person) => ({
            id: person.personId,
            // If multiplePeople mode, use person's amount, otherwise use total amount
            amount: multiplePeople ? Number(person.amount) || 0 : totalAmount,
          })),
        }
        setCreateSplitData({
          tasks: [...createSplitData.tasks, dataToSave],
        })
        toast.success(`${value.taskName} has been added successfully!`)
        form.reset()
      } finally {
          completeLoading()
      }
    },
  })

  const people = createSplitData.people.map(
    (person: { id: string; firstName: string }) => ({
      id: person.id,
      firstName: person.firstName,
    }),
  )

  return (
    <Box className="mt-12 pb-4">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add Tasks
      </Typography>
      {createSplitData.tasks && createSplitData.tasks.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 2,
          }}
        >
          {createSplitData.tasks.map((task, index) => (
            <TaskChip
              key={index}
              taskName={task.taskName}
              amount={task.amount}
              people={task.people}
              onDelete={onDeleteTask}
            />
          ))}
        </Box>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Box sx={{ mb: 2 }}>
          <form.Field
            name="taskName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A task name is required'
                  : value.length < 3
                    ? 'Task name must be at least 3 characters'
                    : undefined,
            }}
            children={({ state, handleChange, handleBlur }) => {
              return (
                <Box>
                  <TextField
                    id="taskName"
                    label="Task Name"
                    variant="standard"
                    fullWidth
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={state.meta.isTouched && !state.meta.isValid}
                    placeholder="Enter task name"
                  />
                  <FieldInfo
                    field={
                      {
                        state,
                        handleChange,
                        handleBlur,
                        name: 'taskName',
                      } as AnyFieldApi
                    }
                  />
                </Box>
              )
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <form.Field
            name="amount"
            validators={{
              onChange: ({ value }) => {
                if (!value) {
                  return 'Amount is required'
                }
                const numValue = parseFloat(value)
                if (isNaN(numValue)) {
                  return 'Please enter a valid number'
                }
                if (numValue <= 0) {
                  return 'Amount must be greater than 0'
                }
                return undefined
              },
            }}
            children={({ state, handleChange, handleBlur }) => (
              <Box>
                <TextField
                  id="amount"
                  label="Amount"
                  variant="standard"
                  fullWidth
                  type="number"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={state.meta.isTouched && !state.meta.isValid}
                  placeholder="Enter amount"
                  slotProps={{
                    htmlInput: {
                      step: '0.01',
                      min: '0',
                    },
                  }}
                />
                <FieldInfo
                  field={
                    {
                      state,
                      handleChange,
                      handleBlur,
                      name: 'amount',
                    } as AnyFieldApi
                  }
                />
              </Box>
            )}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={multiplePeople}
                onChange={(e) => {
                  const isMultiple = e.target.checked
                  setMultiplePeople(isMultiple)
                  // Sync form state when switching modes
                  const currentPeople = form.state.values.responsiblePeople
                  if (!isMultiple && currentPeople.length > 1) {
                    // Switch to single: keep only first person
                    form.setFieldValue('responsiblePeople', [
                      currentPeople[0] || { personId: '', amount: '' },
                    ])
                  } else if (isMultiple && currentPeople.length === 1) {
                    // Switch to multiple: ensure we have at least one person with amount
                    form.setFieldValue('responsiblePeople', [
                      {
                        personId: currentPeople[0]?.personId || '',
                        amount: '',
                      },
                    ])
                  }
                }}
              />
            }
            label="Multiple People"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          {multiplePeople && (
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Responsible People
            </Typography>
          )}
          <form.Field name="responsiblePeople" mode="array">
            {(field) => {
              return (
                <Stack spacing={2}>
                  {field.state.value.map((_, i) => {
                    // Get all selected person IDs except the current one
                    const selectedPersonIds = field.state.value
                      .map((person, idx) => (idx !== i ? person.personId : null))
                      .filter((id): id is string => Boolean(id))

                    return (
                      <Stack
                        key={i}
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                      >
                        <form.Field
                          name={`responsiblePeople[${i}].personId`}
                          validators={{
                            onChange: ({ value }) =>
                              !value ? 'Please select a person' : undefined,
                          }}
                        >
                          {(subField) => {
                            return (
                              <FormControl
                                variant="standard"
                                sx={{ flex: 1 }}
                                error={
                                  subField.state.meta.isTouched &&
                                  !subField.state.meta.isValid
                                }
                              >
                                <InputLabel id={`person-${i}-label`}>
                                  {multiplePeople
                                    ? 'Person'
                                    : 'Responsible Person'}
                                </InputLabel>
                                <Select
                                  labelId={`person-${i}-label`}
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                  onBlur={subField.handleBlur}
                                >
                                  <MenuItem value="">
                                    <em>Select a person</em>
                                  </MenuItem>
                                  {people.map((p) => {
                                    const isDisabled =
                                      selectedPersonIds.includes(p.id) &&
                                      subField.state.value !== p.id
                                    return (
                                      <MenuItem
                                        key={p.id}
                                        value={p.id}
                                        disabled={isDisabled}
                                      >
                                        {p.firstName}
                                        {isDisabled && ' (already selected)'}
                                      </MenuItem>
                                    )
                                  })}
                                </Select>
                              </FormControl>
                            )
                          }}
                        </form.Field>

                        {multiplePeople && (
                          <form.Field
                            name={`responsiblePeople[${i}].amount`}
                            validators={{
                              onChange: ({ value }) => {
                                if (!value) {
                                  return 'Amount is required'
                                }
                                const numValue = parseFloat(value)
                                if (isNaN(numValue)) {
                                  return 'Please enter a valid number'
                                }
                                if (numValue <= 0) {
                                  return 'Amount must be greater than 0'
                                }
                                return undefined
                              },
                            }}
                          >
                            {(subField) => {
                              return (
                                <TextField
                                  label="Amount"
                                  variant="standard"
                                  type="number"
                                  sx={{ flex: 1 }}
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                  onBlur={subField.handleBlur}
                                  error={
                                    subField.state.meta.isTouched &&
                                    !subField.state.meta.isValid
                                  }
                                  placeholder="Enter amount"
                                  slotProps={{
                                    htmlInput: {
                                      step: '0.01',
                                      min: '0',
                                    },
                                  }}
                                />
                              )
                            }}
                          </form.Field>
                        )}

                        {multiplePeople && field.state.value.length > 1 && (
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => field.removeValue(i)}
                            sx={{ mt: 2 }}
                            type="button"
                          >
                            <Trash2 size={20} />
                          </IconButton>
                        )}
                      </Stack>
                    )
                  })}
                  {multiplePeople && (
                    <Box>
                      <OutlinedButton
                        type="button"
                        onClick={() =>
                          field.pushValue({ personId: '', amount: '' })
                        }
                        startIcon={<PlusIcon />}
                        size="small"
                      >
                        Add Person
                      </OutlinedButton>
                    </Box>
                  )}
                </Stack>
              )
            }}
          </form.Field>
        </Box>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <FilledButton
              type="submit"
              disabled={!canSubmit}
              startIcon={<PlusIcon />}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </FilledButton>
          )}
        />
      </form>
    </Box>
  )
}
