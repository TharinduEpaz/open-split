import Box from '@mui/material/Box'

// Test comment for pre-commit hook
export function HomeContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        backgroundColor: '#f5f5f5',
        background: `
          radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%),
          radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.15) 0px, transparent 50%),
          radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.15) 0px, transparent 50%),
          radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.15) 0px, transparent 50%),
          radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.15) 0px, transparent 50%),
          radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.15) 0px, transparent 50%),
          radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.15) 0px, transparent 50%),
          #f5f5f5
        `,
      }}
    >
      {children}
    </Box>
  )
}
