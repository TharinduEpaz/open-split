import { FilledButton } from '@/components/ui/common/filled-button'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from '@tanstack/react-form'
import { useEffect } from 'react'
import { useCreateSplit } from '../../state/use-create-split'

export default function SplitNameDialog() {
  const { createSplitData, setCreateSplitData } = useCreateSplit()
  const isOpen = !createSplitData.splitName

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

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      splitNameForm.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Dialog
      open={isOpen}
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          Welcome! Let's Create Your Split
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Give your split a name to get started. This will help you identify
            it later.
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              splitNameForm.handleSubmit()
            }}
          >
            <Box sx={{ mb: 3 }}>
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
                        variant="outlined"
                        fullWidth
                        autoFocus
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        error={state.meta.isTouched && !state.meta.isValid}
                        placeholder="e.g., Weekend Trip to Bali"
                        helperText={
                          state.meta.isTouched && state.meta.errors.length > 0
                            ? state.meta.errors[0]
                            : 'Enter a descriptive name for your split'
                        }
                      />
                    </Box>
                  )
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <splitNameForm.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <FilledButton type="submit" disabled={!canSubmit}>
                    {isSubmitting ? 'Saving...' : 'Continue'}
                  </FilledButton>
                )}
              />
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

