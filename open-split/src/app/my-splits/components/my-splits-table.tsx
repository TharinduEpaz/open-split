import { OutlinedButton } from '@/components/ui/common/outlined-button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from '@tanstack/react-router'
import { KanbanSquare } from 'lucide-react'

interface Split {
  id: string
  name: string
  date: string
}

const splits: Split[] = [
  { id: '1', name: 'Weekend Trip to Bali', date: '2024-11-01' },
  { id: '2', name: 'Office Lunch', date: '2024-11-03' },
  { id: '3', name: 'Movie Night', date: '2024-11-05' },
  { id: '4', name: 'Camping Adventure', date: '2024-11-07' },
]

export default function MySplitsTable() {
  const navigate = useNavigate()

  const handleViewSplit = (splitId: string) => {
    navigate({ to: '/my-splits/$splitId', params: { splitId } })
  }

  return (
    <TableContainer  className='rounded-none'>
      <Table sx={{ minWidth: 650 }} aria-label="splits table">
        <TableHead>
          <TableRow>
            <TableCell>Split Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {splits.map((split) => (
            <TableRow
              key={split.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {split.name}
              </TableCell>
              <TableCell align="center">{split.date}</TableCell>
              <TableCell align="right">
                <OutlinedButton
                  size="small"
                  startIcon={<KanbanSquare size={16} />}
                  onClick={() => handleViewSplit(split.id)}
                >
                  View Split Details
                </OutlinedButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
