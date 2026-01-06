import SplitDetails from '@/app/split-details/split-details'
import { Box } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-splits/$splitId/$payerName')({
  component: RouteComponent,
})

function RouteComponent() {
  const { payerName } = Route.useParams()

  return (
    <>
      <Box height={'70px'}>
        <span className="text-4xl instrument-serif-regular ">
          💰 {payerName}
        </span>
      </Box>
      <Box sx={{ mt: 4 }}>
        {/* <Typography variant="h6">
          Payment details for {payerName} in split {splitId}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This is where the payment details and settlement information will be displayed.
        </Typography> */}
        <SplitDetails />
        
      </Box>
    </>
  )
}
