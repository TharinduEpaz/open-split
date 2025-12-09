import { FieldInfo } from '@/components/form/field-info'
import { FilledButton } from '@/components/ui/common/filled-button'
import { useLoadingBar } from '@/hooks/use-loading-bar'
import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import type { AnyFieldApi } from '@tanstack/react-form'
import { useForm } from '@tanstack/react-form'
import { PlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useCreateSplit } from '../../state/use-create-split'
import { PeopleChip } from './people-chip'

interface AddPeopleFormProps {
  onDeletePerson: (personId: string) => void
}

export default function AddPeopleForm({ onDeletePerson }: AddPeopleFormProps) {
  const {
    setCreateSplitData,
    createSplitData,
    showBankDetails,
    setShowBankDetails,
    setIsFormSubmitted,
  } = useCreateSplit()
  const { start: startLoading, complete: completeLoading } = useLoadingBar()

  // Compute splitNameSubmitted from store
  const splitNameSubmitted = !!createSplitData.splitName

  // Form for split name (one-time submit)
  const splitNameForm = useForm({
    defaultValues: {
      splitName: createSplitData.splitName || '',
    },
    onSubmit: async ({ value }) => {
      setCreateSplitData({
        splitName: value.splitName,
      })
    },
  })

  // Form for people info (can submit multiple times)
  const peopleForm = useForm({
    defaultValues: {
      id: crypto.randomUUID(),
      firstName: '',
      email: '',
      bankDetails: {
        accountNo: '',
        bank: '',
        branch: '',
        accName: '',
      },
    },
    onSubmit: async ({ value }) => {
      startLoading()
      try {
        // Append new person to existing people array
        const existingPeople = createSplitData.people || []
        setCreateSplitData({
          people: [...existingPeople, value],
        })
        toast.success(`${value.firstName} has been added successfully!`)
        peopleForm.reset()
        setShowBankDetails(false)
      } finally {
        completeLoading()
      }
    },
  })

  useEffect(() => {
    if (splitNameForm.state.isSubmitted && peopleForm.state.isSubmitted) {
      setIsFormSubmitted(true)
    }
  }, [splitNameForm.state.isSubmitted, peopleForm.state.isSubmitted])

  return (
    <Box
      className="mt-12 pb-4"
    >
      {/* Split Name Section */}
      <Box sx={{ mb: 4, pb: 3, borderBottom: '1px solid #e5e7eb' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Split Name
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            splitNameForm.handleSubmit()
          }}
        >
          <Box sx={{ mb: 2 }}>
            <splitNameForm.Field
              name="splitName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Split name is required'
                    : value.length < 3
                      ? 'Split name must be at least 3 characters'
                      : undefined,
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <Box>
                    <TextField
                      id="splitName"
                      label="Split Name"
                      variant="standard"
                      fullWidth
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={state.meta.isTouched && !state.meta.isValid}
                      placeholder="e.g., Weekend Trip to Bali"
                      disabled={splitNameSubmitted}
                    />
                    <FieldInfo
                      field={
                        {
                          state,
                          handleChange,
                          handleBlur,
                          name: 'splitName',
                        } as AnyFieldApi
                      }
                    />
                  </Box>
                )
              }}
            />
          </Box>
          {!splitNameSubmitted && (
            <splitNameForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <FilledButton type="submit" disabled={!canSubmit}>
                  {isSubmitting ? 'Saving...' : 'Save Split Name'}
                </FilledButton>
              )}
            />
          )}
          {splitNameSubmitted && (
            <Typography variant="body2" color="success.main">
              ✓ Split name saved
            </Typography>
          )}
        </form>
      </Box>

      {/* People Info Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add People
        </Typography>
        {createSplitData.people && createSplitData.people.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 2,
            }}
          >
            {createSplitData.people.map((person) => (
              <PeopleChip
                key={person.id}
                id={person.id}
                name={person.firstName}
                email={person.email}
                bankDetails={person.bankDetails}
                onDelete={onDeletePerson}
              />
            ))}
          </Box>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            peopleForm.handleSubmit()
          }}
        >
          <Box sx={{ mb: 2 }}>
            <peopleForm.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'A first name is required'
                    : value.length < 3
                      ? 'First name must be at least 3 characters'
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') &&
                    'No "error" allowed in first name'
                  )
                },
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <Box>
                    <TextField
                      id="firstName"
                      label="First Name"
                      variant="standard"
                      fullWidth
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={state.meta.isTouched && !state.meta.isValid}
                      placeholder="Enter your first name"
                    />
                    <FieldInfo
                      field={
                        {
                          state,
                          handleChange,
                          handleBlur,
                          name: 'firstName',
                        } as AnyFieldApi
                      }
                    />
                  </Box>
                )
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <peopleForm.Field
              name="email"
              children={({ state, handleChange, handleBlur }) => (
                <Box>
                  <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={state.meta.isTouched && !state.meta.isValid}
                    placeholder="Enter your email"
                  />
                  <FieldInfo
                    field={
                      {
                        state,
                        handleChange,
                        handleBlur,
                        name: 'email',
                      } as AnyFieldApi
                    }
                  />
                </Box>
              )}
            />
          </Box>

          {showBankDetails && (
            <Box>
              <Typography variant="subtitle2" sx={{ mt: 4 }}>
                Bank Details
              </Typography>
              <FormGroup>
                <Box sx={{ mb: 2 }}>
                  <peopleForm.Field
                    name="bankDetails.accName"
                    children={({ state, handleChange, handleBlur }) => (
                      <Box>
                        <TextField
                          id="accName"
                          label="Account Name"
                          variant="standard"
                          fullWidth
                          value={state.value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                          error={state.meta.isTouched && !state.meta.isValid}
                          placeholder="Enter Bank Account Name"
                        />
                        <FieldInfo
                          field={
                            {
                              state,
                              handleChange,
                              handleBlur,
                              name: 'accName',
                            } as AnyFieldApi
                          }
                        />
                      </Box>
                    )}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <peopleForm.Field
                    name="bankDetails.accountNo"
                    children={({ state, handleChange, handleBlur }) => (
                      <Box>
                        <TextField
                          id="accountNo"
                          label="Account Number"
                          variant="standard"
                          fullWidth
                          value={state.value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                          error={state.meta.isTouched && !state.meta.isValid}
                          placeholder="Enter Account Number"
                        />
                        <FieldInfo
                          field={
                            {
                              state,
                              handleChange,
                              handleBlur,
                              name: 'accountNo',
                            } as AnyFieldApi
                          }
                        />
                      </Box>
                    )}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <peopleForm.Field
                    name="bankDetails.bank"
                    children={({ state, handleChange, handleBlur }) => (
                      <Box>
                        <TextField
                          id="bank"
                          label="Bank Name"
                          variant="standard"
                          fullWidth
                          value={state.value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                          error={state.meta.isTouched && !state.meta.isValid}
                          placeholder="Enter Bank Name"
                        />
                        <FieldInfo
                          field={
                            {
                              state,
                              handleChange,
                              handleBlur,
                              name: 'bank',
                            } as AnyFieldApi
                          }
                        />
                      </Box>
                    )}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <peopleForm.Field
                    name="bankDetails.branch"
                    children={({ state, handleChange, handleBlur }) => (
                      <Box>
                        <TextField
                          id="branch"
                          label="Branch"
                          variant="standard"
                          fullWidth
                          value={state.value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                          error={state.meta.isTouched && !state.meta.isValid}
                          placeholder="Enter Branch"
                        />
                        <FieldInfo
                          field={
                            {
                              state,
                              handleChange,
                              handleBlur,
                              name: 'branch',
                            } as AnyFieldApi
                          }
                        />
                      </Box>
                    )}
                  />
                </Box>
              </FormGroup>
            </Box>
          )}

          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showBankDetails}
                  onChange={(e) => setShowBankDetails(e.target.checked)}
                />
              }
              label="Add Bank Details"
            />
          </Box>

          <peopleForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <FilledButton
                type="submit"
                disabled={!canSubmit}
                startIcon={<PlusIcon />}
              >
                {isSubmitting ? 'Adding...' : 'Add Person'}
              </FilledButton>
            )}
          />
        </form>
      </Box>
    </Box>
  )
}
