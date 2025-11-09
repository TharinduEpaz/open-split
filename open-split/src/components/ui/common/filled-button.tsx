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
      className="rounded-none text-white bg-gradient-to-tl from-purple-700 to-slate-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
      size={size}
      {...props}
    >
      {children}
    </Button>
  )
}
