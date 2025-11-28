import { Box, Divider, Stack, Typography } from '@mui/material'
import { ChipCard } from '@/components/ui/common/chip-card'

export interface PeopleChipProps {
  id: string
  name: string
  email: string
  bankDetails: {
    accName: string
    accountNo: string
    bank: string
    branch: string
  }
  onDelete: (id: string) => void
}

export function PeopleChip({ id, name, email, bankDetails, onDelete }: PeopleChipProps) {
  const modalContent = (
    <Stack spacing={2}>
      {name && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Name
          </Typography>
          <Typography variant="body1">{name}</Typography>
        </Box>
      )}
      {email && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body1">{email}</Typography>
        </Box>
      )}

      {(bankDetails.accName || bankDetails.accountNo || bankDetails.bank || bankDetails.branch) && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Bank Details
          </Typography>

          {bankDetails.accName && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Account Name
              </Typography>
              <Typography variant="body1">{bankDetails.accName}</Typography>
            </Box>
          )}
          {bankDetails.accountNo && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Account Number
              </Typography>
              <Typography variant="body1">{bankDetails.accountNo}</Typography>
            </Box>
          )}
          {bankDetails.bank && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Bank Name
              </Typography>
              <Typography variant="body1">{bankDetails.bank}</Typography>
            </Box>
          )}
          {bankDetails.branch && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Branch
              </Typography>
              <Typography variant="body1">{bankDetails.branch}</Typography>
            </Box>
          )}
        </>
      )}
    </Stack>
  )

  return (
    <ChipCard
      label={name}
      onDelete={() => onDelete(id)}
      modalTitle="Person Details"
      modalContent={modalContent}
    />
  )
}

