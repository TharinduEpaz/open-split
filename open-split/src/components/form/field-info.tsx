import { FormHelperText } from '@mui/material'
import type { AnyFieldApi } from '@tanstack/react-form'

interface FieldInfoProps {
  field: AnyFieldApi
}

export function FieldInfo({ field }: FieldInfoProps) {
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
