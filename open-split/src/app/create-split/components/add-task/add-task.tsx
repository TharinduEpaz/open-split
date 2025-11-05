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

interface Task {
  name: string
  amount: number
}

function AddTask() {
  const tasks: Array<Task> = [
    { name: 'Dinner', amount: 150.0 },
    { name: 'Movie Tickets', amount: 45.5 },
    { name: 'Transportation', amount: 30.0 },
  ]

  return (
    <>
      <Stack direction={'row'}>
        <Box width={'50%'}>
          <AddTaskForm />
        </Box>
        <Box width={'50%'}>
          <Stack direction={'column'} className="mt-16 p-4 gap-4">
            {tasks.map((task, index) => (
              <TaskCard key={index} name={task.name} amount={task.amount} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  )
}

interface TaskCardProps {
  name: string
  amount: number
}

function TaskCard({ name, amount }: TaskCardProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Delete:', name)
  }

  return (
    <>
      <Card
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50"
        onClick={handleOpen}
      >
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Stack direction={'column'} sx={{ flex: 1 }}>
          <SplitSubtitle>{name}</SplitSubtitle>
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
                <Typography variant="body1">{name}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Amount
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${amount.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddTask
