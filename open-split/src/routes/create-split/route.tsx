import Container from '@mui/material/Container'
import { createFileRoute } from '@tanstack/react-router'
import CreateSplitStepper from '@/app/create-split/stepper'
import { SplitTitle } from '@/components/ui/common/split-title'

export const Route = createFileRoute('/create-split')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Container className="mt-10 mb-10" maxWidth="md">
        <SplitTitle>Create Split</SplitTitle>
        <CreateSplitStepper />
      </Container>
    </>
  )
}
