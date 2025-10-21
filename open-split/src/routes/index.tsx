import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { HomeContainer } from './root-layout'
import { FilledButton } from '../components/ui/common/filled-button'
import { OutlinedButton } from '../components/ui/common/outlined-button'
import { SplitTitle } from '../components/ui/common/split-title'
import { SplitSubtitle } from '../components/ui/common/split-subtitle'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <HomeContainer>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          {/* Header Section */}
          <Box sx={{ mb: 6 }}>
            <SplitTitle>
              Welcome to open split
            </SplitTitle>
            <SplitSubtitle>
              Easily create fund splits with your friends
            </SplitSubtitle>
          </Box>

          {/* Buttons Section */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center' }}
          >
            <FilledButton>
              Generate Split
            </FilledButton>
            <OutlinedButton>
              View Recent Splits
            </OutlinedButton>
          </Stack>
        </Box>
      </Container>
    </HomeContainer>
  )
}
