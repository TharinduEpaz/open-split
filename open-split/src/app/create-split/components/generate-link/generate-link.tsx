import { FilledButton } from '@/components/ui/common/filled-button'
import { OutlinedButton } from '@/components/ui/common/outlined-button'
import { Divider, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import { Link, Shuffle } from 'lucide-react'
import DebtTable from './debt-table'
import PieChartWithCenterLabel from './pie-chart'

export const GenerateLink = () => {
  return (
    <>
      <Box padding={10} className="flex flex-col justify-center align-center">
        <Stack direction={'row'}>
          <PieChartWithCenterLabel centerLabel="Contribution" />
          <PieChartWithCenterLabel centerLabel="Task wise distribution" />
        </Stack>
      </Box>
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
