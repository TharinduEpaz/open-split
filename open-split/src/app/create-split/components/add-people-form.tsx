import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { useForm } from '@tanstack/react-form'
import { useCreateSplit } from '../state/use-create-split'
import type { AnyFieldApi } from '@tanstack/react-form'

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

export default function App() {
  const { setCreateSplitData } = useCreateSplit()

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      // Save form data to Zustand store
      setCreateSplitData({
        firstName: value.firstName,
        lastName: value.lastName,
      })
      console.log('Data saved to store:', value)
    },
  })

  return (
    <Box className="mt-12">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Box sx={{ mb: 2 }} className="mt-4 max-w-md">
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
                    variant="filled"
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
            name="lastName"
            children={({ state, handleChange, handleBlur }) => (
              <Box>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="filled"
                  fullWidth
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={state.meta.isTouched && !state.meta.isValid}
                  placeholder="Enter your last name"
                />
                <FieldInfo
                  field={
                    {
                      state,
                      handleChange,
                      handleBlur,
                      name: 'lastName',
                    } as AnyFieldApi
                  }
                />
              </Box>
            )}
          />
        </Box>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant="contained"
              disabled={!canSubmit}
              fullWidth
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        />
      </form>
    </Box>
  )
}
