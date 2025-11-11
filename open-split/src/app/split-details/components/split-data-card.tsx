import { Chip, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Check } from 'lucide-react';

interface SplitDataCardProps {
  name: string;
  status: string;
  amount: number;
  paid: boolean;
}

export default function SplitDataCard({ name, status, amount, paid }: SplitDataCardProps) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: paid ? '#d4f4dd' : 'white' }}>
      <CardActionArea>

        <CardContent>
          <Stack direction={"row"} className='flex justify-between items-center'>


          <Typography gutterBottom variant="h5" component="div">{name}</Typography>
          <Chip
            label={status}
            size="small"
            color={paid ? "success" : "default"}
          />
          </Stack>
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
           Pay {amount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="flex gap-2 p-4">
        <Button
        className='text-xs'
          startIcon={<Check />}
          disabled={paid}
        >
         {paid ? 'Paid' : 'Mark as Paid'}
        </Button>
        <Button
        className='text-xs'
        >
          View Bank Details
        </Button>
      </CardActions>
    </Card>
  );
}
