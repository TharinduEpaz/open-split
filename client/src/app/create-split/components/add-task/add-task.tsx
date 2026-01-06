import { Box } from '@mui/material'
import AddTaskForm from './add-task-form'
import { useCreateSplit } from '../../state/use-create-split'

function AddTask() {
  const { createSplitData, setCreateSplitData } = useCreateSplit()

  const handleDeleteTask = (taskName: string) => {
    const updatedTasks = createSplitData.tasks.filter(
      (task) => task.taskName !== taskName
    )
    setCreateSplitData({ tasks: updatedTasks })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AddTaskForm onDeleteTask={handleDeleteTask} />
    </Box>
  )
}

export default AddTask
