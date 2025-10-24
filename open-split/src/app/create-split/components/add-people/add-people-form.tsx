import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from '@tanstack/react-form'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useCreateSplit } from '../../state/use-create-split'
import type { AnyFieldApi } from '@tanstack/react-form'
import { FilledButton } from '@/components/ui/common/filled-button'

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <FormHelperText error>
          {field.state.meta.errors.join(', ')}
        </FormHelperText>
      ) : null}
      {field.state.meta.isValidating ? (
        <FormHelperText>Validating...</FormHelperText>
      ) : null}
    </>
  )
}

export default function AddPeopleForm() {
  const { setCreateSplitData } = useCreateSplit()
  const [showBankDetails, setShowBankDetails] = useState(false)

  const form = useForm({
    defaultValues: {
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
      // Save form data to Zustand store
      setCreateSplitData({
        firstName: value.firstName,
        email: value.email,
        bankDetails: showBankDetails ? value.bankDetails : null,
      })
      console.log('Data saved to store:', value)
    },
  })

  return (
    <Box className="mt-12 h-120" maxWidth={'400px'}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Box sx={{ mb: 2 }}>
          <form.Field
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
                  value.includes('error') && 'No "error" allowed in first name'
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
          <form.Field
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

        {showBankDetails && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Bank Details
            </Typography>
            <FormGroup>
              <Box sx={{ mb: 2 }}>
                <form.Field
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
                <form.Field
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
                <form.Field
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
                <form.Field
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
