import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'

interface FilledButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  size?: 'small' | 'medium' | 'large'
}

export function FilledButton({
  children,
  sx,
  size = 'large',
  ...props
}: FilledButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      className="rounded-full"
      size={size}
      {...props}
    >
      {children}
    </Button>
  )
}
