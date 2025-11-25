import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import { Trash2 } from 'lucide-react'
import * as React from 'react'
import AddPeopleForm from './add-people-form'
import { SplitSubtitle } from '@/components/ui/common/split-subtitle'
import { useCreateSplit } from '../../state/use-create-split'

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


function AddPeople() {
  const { createSplitData } = useCreateSplit()

  return (
    <>
      <Stack 
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 2, md: 0 }}
        sx={{ width: '100%' }}
      >
        <Box 
          width={{ xs: '100%', md: '50%' }}
          sx={{ pr: { xs: 0, md: 2 } }}
        >
          <AddPeopleForm />
        </Box>
        <Box 
          width={{ xs: '100%', md: '50%' }}
          className="overflow-auto border-gray-200 mt-4"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: { xs: '300px', md: '400px' },
            m: { xs: 0, md: 2 },
            mt: { xs: 2, md: 2 },
          }}
        >
          {createSplitData.people && createSplitData.people.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                height: '100%',
              }}
            >
              <Typography variant="caption" className="text-gray-500">
                No people added yet
              </Typography>
            </Box>
          ) : (
            <Stack direction={'column'} className=" p-4 gap-4">
              {createSplitData.people.map((person, index) => (
                <PeopleCard key={index} name={person.firstName} email={person.email} bankDetails={person.bankDetails} />
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  )
}

interface PeopleCardProps {
  name: string
  email: string
  bankDetails: {
    accName: string
    accountNo: string
    bank: string
    branch: string
  }
}

function PeopleCard({ name, email, bankDetails }: PeopleCardProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Get initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Add delete logic here
    console.log('Delete:', name)
  }

  return (
    <>
      <Card
        className="flex items-center cursor-pointer hover:bg-gray-50"
        sx={{
          gap: { xs: 2, sm: 4 },
          p: { xs: 2, sm: 4 },
        }}
        onClick={handleOpen}
      >
        <Avatar>{getInitials(name)}</Avatar>
        <Stack direction={'column'} sx={{ flex: 1 }}>
          <SplitSubtitle>{name}</SplitSubtitle>
          <span>{email}</span>
        </Stack>
        <IconButton color="warning" size="small" onClick={handleDelete}>
          <Trash2 size={20} />
        </IconButton>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography id="person-details-title" variant="h6" component="h2">
            Person Details
          </Typography>
          <Box sx={{ mt: 3 }}>
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
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddPeople
