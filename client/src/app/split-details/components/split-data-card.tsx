import { FilledButton } from '@/components/ui/common/filled-button'
import { OutlinedButton } from '@/components/ui/common/outlined-button'
import { Check, EyeIcon } from 'lucide-react'
import { Box, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'

interface SplitDataCardProps {
  name: string;
  status: string;
  amount: number;
  paid: boolean;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  maxWidth: '90vw',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  outline: 'none',
  maxHeight: '90vh',
  overflow: 'auto',
}

// Dummy bank details data
const dummyBankDetails = {
  accName: 'John Doe',
  accountNo: '1234567890',
  bank: 'Commercial Bank',
  branch: 'Colombo 05',
}

export default function SplitDataCard({ name, status, amount, paid }: SplitDataCardProps) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <div className="rounded-2xl border-2 border-gray-800 p-6 flex flex-col justify-between min-h-40 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{name}</h2>
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
              paid 
                ? 'bg-green-400/10 text-green-400 inset-ring inset-ring-green-500/20' 
                : 'bg-gray-400/10 text-gray-400 inset-ring inset-ring-gray-400/20'
            }`}>
              {status}
            </span>
            <p className="text-lg font-semibold mt-4">
              Pay ${amount.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end ml-4">
            <div className="flex flex-col gap-2 w-full" style={{ minWidth: '140px' }}>
              <FilledButton
                size="small"
                startIcon={<Check size={16} />}
                disabled={paid}
                className="w-full"
              >
                {paid ? 'Paid' : 'Mark as Paid'}
              </FilledButton>
              <OutlinedButton
                size="small"
                startIcon={<EyeIcon size={16} />}
                className="w-full"
                onClick={handleOpen}
              >
                Bank Details
              </OutlinedButton>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography id="bank-details-title" variant="h6" component="h2">
            Bank Details
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Account Name
                </Typography>
                <Typography variant="body1">{dummyBankDetails.accName}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Account Number
                </Typography>
                <Typography variant="body1">{dummyBankDetails.accountNo}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Bank Name
                </Typography>
                <Typography variant="body1">{dummyBankDetails.bank}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Branch
                </Typography>
                <Typography variant="body1">{dummyBankDetails.branch}</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
