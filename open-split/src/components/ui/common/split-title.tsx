import Typography from '@mui/material/Typography'

interface SplitTitleProps {
  children: React.ReactNode
}

export function SplitTitle({ children }: SplitTitleProps) {
  return (
    <Typography
      variant="h3"
      component="h1"
      sx={{
        fontWeight: 700,
        fontSize: { xs: '2.5rem', sm: '3.5rem' },
        mb: 2,
        color: '#000',
      }}
    >
      {children}
    </Typography>
  )
}
