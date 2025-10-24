import {
  Box,
  Divider,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
} from '@mui/material'
import { useForm } from '@tanstack/react-form'
import { PlusIcon } from 'lucide-react'
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
        bankDetails: value.bankDetails,
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

        <Divider />

        <Box>
          <FormGroup>
            <FormLabel>Bank Account Details (optional)</FormLabel>
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
          </FormGroup>
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
