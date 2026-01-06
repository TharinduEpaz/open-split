import Typography from '@mui/material/Typography'

interface SplitTitleProps {
  children: React.ReactNode
}

export function SplitTitle({ children }: SplitTitleProps) {
  return (
    <Typography
      variant="h1"
      component="h1"
      color='primary'
      sx={{
        fontWeight: 800,
        mb: 2,
      }}
      className='text-8xl text-primary instrument-serif-regular font-bold'
    >
      {children}
    </Typography>
  )
}
