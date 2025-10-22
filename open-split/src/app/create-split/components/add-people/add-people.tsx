import * as React from 'react'
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import { Trash2 } from 'lucide-react'
import AddPeopleForm from './add-people-form'
import { SplitSubtitle } from '@/components/ui/common/split-subtitle'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: 'none',
}

interface Person {
  name: string
  email: string
}

function AddPeople() {
  const people: Array<Person> = [
    { name: 'Tharindu Epasingha', email: 'epazingha@gmail.com' },
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
  ]

  return (
    <>
      <Stack direction={'row'}>
        <Box width={'50%'}>
          <AddPeopleForm />
        </Box>
        <Box width={'50%'}>
          <Stack direction={'column'} className="mt-16 p-4 gap-4">
            {people.map((person, index) => (
              <PeopleCard key={index} name={person.name} email={person.email} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  )
}

interface PeopleCardProps {
  name: string
  email: string
}

function PeopleCard({ name, email }: PeopleCardProps) {
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
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50"
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
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{email}</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddPeople
