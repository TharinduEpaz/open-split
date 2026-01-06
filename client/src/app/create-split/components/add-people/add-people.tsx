import { Box } from '@mui/material'
import AddPeopleForm from './add-people-form'
import { useCreateSplit } from '../../state/use-create-split'


function AddPeople() {
  const { createSplitData, setCreateSplitData } = useCreateSplit()

  const handleDeletePerson = (personId: string) => {
    const updatedPeople = createSplitData.people.filter((person) => person.id !== personId)
    setCreateSplitData({ people: updatedPeople })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AddPeopleForm onDeletePerson={handleDeletePerson} />
    </Box>
  )
}


export default AddPeople
