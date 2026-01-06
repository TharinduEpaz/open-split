import { OutlinedButton } from '@/components/ui/common/outlined-button'
import Box from '@mui/material/Box'
import { RefreshCcw } from 'lucide-react'
import MySplitsTable from './components/my-splits-table'

const MySplits = () => {
  return (
    <>
      <OutlinedButton startIcon={<RefreshCcw />}>Refresh</OutlinedButton>
      <Box className="mt-2 pt-4">
      <MySplitsTable />
      </Box>
    </>
  )
}
export default MySplits
