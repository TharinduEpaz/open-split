import Typography from '@mui/material/Typography'

interface SplitSubtitleProps {
  children: React.ReactNode
}

export function SplitSubtitle({ children }: SplitSubtitleProps) {
  return (
    <Typography
      variant="h6"
      sx={{
        fontSize: '1.125rem',
        color: '#666',
        fontWeight: 400,
      }}
      className='text-amber-200'
    >
      {children}
    </Typography>
  )
}
