import { Box, Container } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import CreateSplitStepper from '@/app/create-split/stepper'
import BasicBreadcrumbs from '@/components/breadcrumb'

export const Route = createFileRoute('/create-split')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container className="mt-10 mb-10" maxWidth="md">
      <BasicBreadcrumbs />
      <Box height={'100px'}>
        <span className="text-4xl instrument-serif-regular ">
          🛠️ Create Split{' '}
        </span>
      </Box>
      <CreateSplitStepper />
    </Container>
  )
}
