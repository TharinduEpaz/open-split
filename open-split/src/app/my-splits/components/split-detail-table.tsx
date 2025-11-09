import { FilledButton } from '@/components/ui/common/filled-button'
import { Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from '@tanstack/react-router'
import { Handshake } from 'lucide-react'

interface Person {
  id: string
  name: string
  status: 'fully-settled' | 'unsettled' | 'partially-settled'
}

const people: Person[] = [
  { id: '1', name: 'Tharindu Epasingha', status: 'fully-settled' },
  { id: '2', name: 'John Doe', status: 'unsettled' },
  { id: '3', name: 'Jane Smith', status: 'fully-settled' },
  { id: '4', name: 'Mike Wilson', status: 'partially-settled' },
]

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'fully-settled':
      return 'FULLY SETTLED'
    case 'unsettled':
      return 'UNSETTLED'
    case 'partially-settled':
      return 'PARTIALLY SETTLED'
    default:
      return status.toUpperCase()
  }
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'fully-settled':
      return {
        color: '#2e7d32',
      }
    case 'unsettled':
      return {
        color: '#d84315',
      }
    case 'partially-settled':
      return {
        color: '#f57f17',
      }
    default:
      return {}
  }
}

export default function SplitDetailTable() {
  const navigate = useNavigate()
  const handleViewPerson = (personName: string) => {
    navigate({
      to: '/my-splits/$splitId/$payerName',
      from: '/my-splits/$splitId',
      params: {
        payerName: personName,
      },
    })
    // Handle viewing person details
  }

  return (
    <>
      <Typography variant="subtitle1" className="p-2">
        Please Select your name and settle the pending amount
      </Typography>
      <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="split details table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow
                key={person.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {person.name}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={getStatusLabel(person.status)}
                    size="small"
                    sx={{
                      ...getStatusStyles(person.status),
                      minWidth: '150px',
                      fontWeight: 600,
                      borderRadius:0,
                      backgroundColor:"white",
                      border:"1px solid"
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <FilledButton
                    size="small"
                    startIcon={<Handshake size={16} />}
                    onClick={() => handleViewPerson(person.name)}
                  >
                  Settle Debts 
                  </FilledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
