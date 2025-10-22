import CreateSplitStepper from '@/app/create-split/stepper'
import BasicBreadcrumbs from '@/components/breadcrumb'
import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-split')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Container className="mt-10 mb-10" maxWidth="md">
        <BasicBreadcrumbs />
        <Box height={"100px"}>
          <span className="text-4xl instrument-serif-regular ">🔀 Create Split </span>
        </Box>
        <CreateSplitStepper />
      </Container>
    </>
  )
}
