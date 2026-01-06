/**
 * Sets an error on a form field
 * @param form - The TanStack Form instance
 * @param fieldName - The name of the field to set the error on
 * @param errorMessage - The error message to display
 * @param validatorType - The validator type (default: 'onChange')
 */
export function setFieldError(
  form: {
    setFieldMeta: (name: any, updater: any) => void
  },
  fieldName: string,
  errorMessage: string,
  validatorType: 'onChange' | 'onBlur' | 'onSubmit' = 'onChange',
) {
  form.setFieldMeta(fieldName as any, (prevMeta: any) => ({
    ...prevMeta,
    errorMap: {
      ...prevMeta.errorMap,
      [validatorType]: errorMessage,
    },
    isValid: false,
    isTouched: true,
  }))
}

/**
 * Clears errors on a form field
 * @param form - The TanStack Form instance
 * @param fieldName - The name of the field to clear errors on
 */
export function clearFieldError(
  form: {
    setFieldMeta: (name: any, updater: any) => void
  },
  fieldName: string,
) {
  form.setFieldMeta(fieldName as any, (prevMeta: any) => ({
    ...prevMeta,
    errorMap: {},
    isValid: true,
  }))
}

