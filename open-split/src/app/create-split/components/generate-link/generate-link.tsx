import { FilledButton } from '@/components/ui/common/filled-button'
import { Divider, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import { Link } from 'lucide-react'
import { useState } from 'react'
import DebtTable from './debt-table'
import LoadingSteps from './loading-steps'
import PieChartWithCenterLabel from './pie-chart'

export const GenerateLink = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading ? <LoadingSteps onComplete={() => setIsLoading(false)} /> : (
        <>
      <Box padding={4} className="flex flex-col justify-center align-center">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PieChartWithCenterLabel
              centerLabel="Contribution"
              type="contribution"
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PieChartWithCenterLabel
              centerLabel="Task Distribution"
              type="taskDistribution"
            />
          </Box>
        </Stack>
      </Box>
      <DebtTable />
      <Divider className="my-8" />
      <Stack direction={'row'} className="gap-3 mb-4" >
        <FilledButton>
          <Link className="w-4 mr-2" />
          Generate Link
        </FilledButton>
      </Stack>
    </>)}
    </>
  )
}


