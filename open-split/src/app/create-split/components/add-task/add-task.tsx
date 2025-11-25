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
import AddTaskForm from './add-task-form'
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

function AddTask() {
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
          <AddTaskForm />
        </Box>
        <Box 
          width={{ xs: '100%', md: '50%' }}
          className="mt-14 overflow-auto rounded-lg border-gray-200"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: { xs: '300px', md: '400px' },
            m: { xs: 0, md: 2 },
            mt: { xs: 2, md: 2 },
          }}
        >
          {createSplitData.tasks && createSplitData.tasks.length === 0 ? (
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
                No tasks added yet
              </Typography>
            </Box>
          ) : (
            <Stack direction={'column'} className="p-4 gap-4">
              {createSplitData.tasks.map((task, index) => (
                <TaskCard
                  key={index}
                  taskName={task.taskName}
                  amount={task.amount}
                  people={task.people}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  )
}

interface TaskCardProps {
  taskName: string
  amount: number
  people: { id: string; amount: number }[]
}

function TaskCard({ taskName, amount, people }: TaskCardProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { createSplitData, setCreateSplitData } = useCreateSplit()

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Remove task from state
    const updatedTasks = createSplitData.tasks.filter(
      (task) => task.taskName !== taskName
    )
    setCreateSplitData({ tasks: updatedTasks })
  }

  // Get person names from people data
  const getPersonName = (personId: string) => {
    const person = createSplitData.people.find((p) => p.id === personId)
    return person ? person.firstName : 'Unknown'
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
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {taskName.charAt(0).toUpperCase()}
        </Avatar>
        <Stack direction={'column'} sx={{ flex: 1 }}>
          <SplitSubtitle>{taskName}</SplitSubtitle>
          <Typography variant="body2" color="text.secondary">
            ${amount.toFixed(2)}
          </Typography>
        </Stack>
        <IconButton color="warning" size="small" onClick={handleDelete}>
          <Trash2 size={20} />
        </IconButton>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography id="task-details-title" variant="h6" component="h2">
            Task Details
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Task Name
                </Typography>
                <Typography variant="body1">{taskName}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${amount.toFixed(2)}
                </Typography>
              </Box>
              {people && people.length > 0 && (
                <>
                  <Divider />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Responsible People
                  </Typography>
                  {people.map((person, index) => (
                    <Box key={index}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {getPersonName(person.id)}
                      </Typography>
                      <Typography variant="body1">
                        ${person.amount.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddTask
