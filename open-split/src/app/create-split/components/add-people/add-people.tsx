import { SplitSubtitle } from '@/components/ui/common/split-subtitle'
import { Avatar, Box, Card, IconButton, Stack } from '@mui/material'
import { Trash2 } from 'lucide-react'
import AddPeopleForm from './add-people-form'

interface Person {
  name: string
  email: string
}

function AddPeople() {
  const people: Person[] = [
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
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }

  return (
    <Card className="flex items-center gap-4 p-4">
      <Avatar>{getInitials(name)}</Avatar>
      <Stack direction={'column'} sx={{ flex: 1 }}>
        <SplitSubtitle>{name}</SplitSubtitle>
        <span>{email}</span>
      </Stack>
      <IconButton color="warning" size="small">
        <Trash2 size={20} />
      </IconButton>
    </Card>
  )
}

export default AddPeople
