import Typography from '@mui/material/Typography'

interface SplitTitleProps {
  children: React.ReactNode
}

export function SplitTitle({ children }: SplitTitleProps) {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={{
        fontWeight: 800,
        mb: 2,
        color: '#000',
      }}
      className='text-white text-8xl'
    >
      {children}
    </Typography>
  )
}
