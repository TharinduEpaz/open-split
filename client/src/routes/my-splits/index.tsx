import { createFileRoute } from '@tanstack/react-router'
import { Box } from '@mui/material'
import MySplits from '@/app/my-splits/my-splits'

export const Route = createFileRoute('/my-splits/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Box height={'70px'}>
        <span className="text-4xl instrument-serif-regular ">
          🌗 My Splits{' '}
        </span>
      </Box>
      <MySplits />
    </>
  )
}
