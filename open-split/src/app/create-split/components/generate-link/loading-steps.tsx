import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

interface LoadingStepsProps {
  onComplete: () => void
}

const steps: string[] = [
  'Analyzing contributions',
  'Calculating balances',
  'Simplifying debts',
  'Generating plan',
]

export default function LoadingSteps({ onComplete }: LoadingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(() => {
        onComplete()
      }, 500)
      return
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [currentStep, onComplete])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ece6ce',
          borderRadius: 2,
          padding: 4,
          minWidth: 300,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack spacing={3} alignItems="center">

          <Stack spacing={2} sx={{ width: '90%' }}>
            {steps.map((step, index) => (
              <Box
                key={step}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  opacity: index < currentStep ? 1 : index === currentStep ? 0.7 : 0.4,
                }}
              >
                {index < currentStep ? (
                  <Check size={20} color="#34c759" />
                ) : index === currentStep ? (
                  <CircularProgress size={16} sx={{ color: '#3b3e5a' }} />
                ) : (
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      border: '2px solid #3b3e5a',
                      opacity: 0.3,
                    }}
                  />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#3b3e5a',
                    fontWeight: index === currentStep ? 600 : 400,
                  }}
                >
                  {step}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

