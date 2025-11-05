import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  shouldPay: string,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, shouldPay, fat, carbs, protein };
}

const rows = [
  createData('Tharindu', 'Sandaru', 6.0, 24, 4.0),
  createData('Pubudu', 'Sandaru', 9.0, 37, 4.3),
  createData('Manchi', 'Tharindu', 16.0, 24, 6.0),
];
export default function DebtTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption className='text-xs'>Tap 'Simplify Debts' to see the optimized payment plan</caption>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Should pay to</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.shouldPay}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
