import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'

interface OutlinedButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  size?: 'small' | 'medium' | 'large'
}

export function OutlinedButton({
  children,
  sx,
  size = 'large',
  ...props
}: OutlinedButtonProps) {
  return (
    <Button
      variant="outlined"
      size={size}
      {...props}
      className="rounded-md border-primary text-primary"
    >
      {children}
    </Button>
  )
}
