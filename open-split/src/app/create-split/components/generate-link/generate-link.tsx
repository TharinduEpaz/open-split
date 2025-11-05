import Box from '@mui/material/Box'
import { FilledButton } from '@/components/ui/common/filled-button'
import { Link, Shrimp, Shuffle } from 'lucide-react'
import PieChartWithCenterLabel from './pie-chart'
import { Divider, Stack, Typography } from '@mui/material'
import { OutlinedButton } from '@/components/ui/common/outlined-button'
import DebtTable from './debt-table'

export const GenerateLink = () => {
  return (
    <>
      <Box padding={10} className="flex flex-col justify-center align-center">
        <Stack direction={'row'}>
          <PieChartWithCenterLabel centerLabel="Contribution" />
          <PieChartWithCenterLabel centerLabel="Task wise distribution" />
        </Stack>
      </Box>
      <Typography variant="h6">Distribution</Typography>
      <DebtTable />
      <Divider className="my-8" />
      <Stack direction={'row'} className="gap-3">
        <OutlinedButton>
          <Shuffle className="w-4 mr-2" />
          Simplify Debts
        </OutlinedButton>
        <FilledButton>
          <Link className="w-4 mr-2" />
          Generate Link
        </FilledButton>
      </Stack>
    </>
  )
}
