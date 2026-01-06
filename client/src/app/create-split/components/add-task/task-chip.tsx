import { Box, Divider, Stack, Typography } from '@mui/material'
import { ChipCard } from '@/components/ui/common/chip-card'
import { useCreateSplit } from '../../state/use-create-split'

export interface TaskChipProps {
  taskName: string
  amount: number
  people: { id: string; amount: number }[]
  onDelete: (taskName: string) => void
}

export function TaskChip({ taskName, amount, people, onDelete }: TaskChipProps) {
  const { createSplitData } = useCreateSplit()

  // Get person names from people data
  const getPersonName = (personId: string) => {
    const person = createSplitData.people.find((p) => p.id === personId)
    return person ? person.firstName : 'Unknown'
  }

  const modalContent = (
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
  )

  return (
    <ChipCard
      label={taskName}
      onDelete={() => onDelete(taskName)}
      modalTitle="Task Details"
      modalContent={modalContent}
    />
  )
}

