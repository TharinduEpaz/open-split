import { FieldInfo } from '@/components/form/field-info'
import { FilledButton } from '@/components/ui/common/filled-button'
import { OutlinedButton } from '@/components/ui/common/outlined-button'
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

// Sample people data - in a real app, this would come from the store
const people = [
  { id: '1', name: 'Tharindu Epasingha', email: 'epazingha@gmail.com' },
  { id: '2', name: 'John Doe', email: 'john@example.com' },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com' },
]

interface ResponsiblePerson {
  personId: string
  amount: string
}

export default function AddTaskForm() {
  const [multiplePeople, setMultiplePeople] = useState(false)
  const [responsiblePeople, setResponsiblePeople] = useState<
    Array<ResponsiblePerson>
  >([{ personId: '', amount: '' }])

  const form = useForm({
    defaultValues: {
      taskName: '',
      amount: '',
      responsiblePerson: '',
    },
    // onSubmit: async ({ value }) => {
    //   // setCreateSplitData(dataToSave)
    // },
  })

  const addResponsiblePerson = () => {
    setResponsiblePeople([...responsiblePeople, { personId: '', amount: '' }])
  }

  const removeResponsiblePerson = (index: number) => {
    setResponsiblePeople(responsiblePeople.filter((_, i) => i !== index))
  }

  const updateResponsiblePerson = (
    index: number,
    field: keyof ResponsiblePerson,
    value: string,
  ) => {
    const updated = [...responsiblePeople]
    updated[index][field] = value
    setResponsiblePeople(updated)
  }

  return (
    <Box className="mt-12" maxWidth={'400px'} sx={{ pb: 4 }}>
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
                onChange={(e) => setMultiplePeople(e.target.checked)}
              />
            }
            label="Multiple People"
          />
        </Box>

        {!multiplePeople ? (
          <Box sx={{ mb: 2 }}>
            <form.Field
              name="responsiblePerson"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Please select a responsible person' : undefined,
              }}
              children={({ state, handleChange, handleBlur }) => (
                <Box>
                  <FormControl
                    variant="standard"
                    fullWidth
                    error={state.meta.isTouched && !state.meta.isValid}
                  >
                    <InputLabel id="responsible-person-label">
                      Responsible Person
                    </InputLabel>
                    <Select
                      labelId="responsible-person-label"
                      id="responsiblePerson"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      label="Responsible Person"
                    >
                      <MenuItem value="">
                        <em>Select a person</em>
                      </MenuItem>
                      {people.map((person) => (
                        <MenuItem key={person.id} value={person.id}>
                          {person.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FieldInfo
                    field={
                      {
                        state,
                        handleChange,
                        handleBlur,
                        name: 'responsiblePerson',
                      } as AnyFieldApi
                    }
                  />
                </Box>
              )}
            />
          </Box>
        ) : (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Responsible People
            </Typography>
            <Stack spacing={2}>
              {responsiblePeople.map((person, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  alignItems="flex-start"
                >
                  <FormControl variant="standard" sx={{ flex: 1 }}>
                    <InputLabel id={`person-${index}-label`}>Person</InputLabel>
                    <Select
                      labelId={`person-${index}-label`}
                      value={person.personId}
                      onChange={(e) =>
                        updateResponsiblePerson(
                          index,
                          'personId',
                          e.target.value,
                        )
                      }
                    >
                      <MenuItem value="">
                        <em>Select a person</em>
                      </MenuItem>
                      {people.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Amount"
                    variant="standard"
                    type="number"
                    sx={{ flex: 1 }}
                    value={person.amount}
                    onChange={(e) =>
                      updateResponsiblePerson(index, 'amount', e.target.value)
                    }
                    placeholder="Enter amount"
                    slotProps={{
                      htmlInput: {
                        step: '0.01',
                        min: '0',
                      },
                    }}
                  />

                  {responsiblePeople.length > 1 && (
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => removeResponsiblePerson(index)}
                      sx={{ mt: 2 }}
                    >
                      <Trash2 size={20} />
                    </IconButton>
                  )}
                </Stack>
              ))}

              <Box>
                <OutlinedButton
                  type="button"
                  onClick={addResponsiblePerson}
                  startIcon={<PlusIcon />}
                  size="small"
                >
                  Add Person
                </OutlinedButton>
              </Box>
            </Stack>
          </Box>
        )}

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
