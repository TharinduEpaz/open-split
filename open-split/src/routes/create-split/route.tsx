import { Box, Container } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import CreateSplitStepper from '@/app/create-split/stepper'
import BasicBreadcrumbs from '@/components/breadcrumb'
import { useCreateSplit } from '@/app/create-split/state/use-create-split'
import { Split } from 'lucide-react'

export const Route = createFileRoute('/create-split')({
  component: RouteComponent,
})

function RouteComponent() {
  const { createSplitData } = useCreateSplit()
  
  return (
    <Container className="mt-10 mb-10" maxWidth="md">
      <BasicBreadcrumbs />
      <Box height={'100px'}>
        <span className="text-4xl instrument-serif-regular flex items-center gap-2">
        <Split /> {createSplitData.splitName ? ` ${createSplitData.splitName}` : 'Create a new split'}
        </span>
      </Box>
      <CreateSplitStepper />
    </Container>
  )
}
