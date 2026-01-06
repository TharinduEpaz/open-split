import { Box } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import SplitDetailTable from '@/app/my-splits/components/split-detail-table'

export const Route = createFileRoute('/my-splits/$splitId/')({
  component: RouteComponent,
})

function RouteComponent() {
  // const { splitId } = Route.useParams()

  return (
    <>
      <Box height={'70px'}>
        <span className="text-4xl instrument-serif-regular ">
          ✨ Beach Party
        </span>
      </Box>
      <Box sx={{ mt: 4 }}>
        <SplitDetailTable />
      </Box>
    </>
  )
}
