import Typography from '@mui/material/Typography'

interface SplitSubtitleProps {
  children: React.ReactNode
}

export function SplitSubtitle({ children }: SplitSubtitleProps) {
  return (
    <Typography
      variant="h6"
      color='primary'
      sx={{
        fontSize: '1.125rem',
        fontWeight: 400,
      }}
    >
      {children}
    </Typography>
  )
}
