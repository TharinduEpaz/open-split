import Box from '@mui/material/Box'
import { Link, Shuffle } from 'lucide-react'
import { Divider, Stack, Typography } from '@mui/material'
import PieChartWithCenterLabel from './pie-chart'
import DebtTable from './debt-table'
import { OutlinedButton } from '@/components/ui/common/outlined-button'
import { FilledButton } from '@/components/ui/common/filled-button'

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
