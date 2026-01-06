import {
  Box,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import { X } from 'lucide-react'
import * as React from 'react'

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

export interface ChipCardProps {
  label: string
  onDelete: () => void
  modalTitle: string
  modalContent: React.ReactNode
}

export function ChipCard({ label, onDelete, modalTitle, modalContent }: ChipCardProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <>
      <Box
        onClick={handleOpen}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-gray-800 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <IconButton
          size="small"
          onClick={handleDelete}
          sx={{
            p: 0,
            minWidth: 'auto',
            width: 16,
            height: 16,
            color: 'text.secondary',
            '&:hover': {
              color: 'error.main',
            },
          }}
        >
          <X size={14} />
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Box sx={{ mt: 3 }}>
            {modalContent}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

