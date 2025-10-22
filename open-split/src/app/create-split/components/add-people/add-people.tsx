import { Paper, Stack } from '@mui/material'
import { Box } from 'lucide-react'
import AddPeopleForm from './add-people-form'

function AddPeople() {
  return (
    <>
      <Stack>
        <AddPeopleForm />
        <Box>
          <Stack direction={'row'}>
            <Paper elevation={0} />
            <Paper />
            fefefef
            <Paper elevation={3} />
          </Stack>
        </Box>
      </Stack>
    </>
  )
}

export default AddPeople
