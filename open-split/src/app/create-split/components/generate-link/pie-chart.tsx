import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { useDrawingArea } from '@mui/x-charts/hooks'
import { styled } from '@mui/material/styles'
import { useCreateSplit } from '../../state/use-create-split'

const size = {
  width: 300,
  height: 300,
}

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 14,
  fontWeight: 500,
}))

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea()
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  )
}

interface PieChartWithCenterLabelProps {
  centerLabel?: string | React.ReactNode
  type: 'contribution' | 'taskDistribution'
}

export default function PieChartWithCenterLabel({
  centerLabel = '',
  type,
}: PieChartWithCenterLabelProps) {
  const { createSplitData } = useCreateSplit()

  // Calculate contribution data (how much each person contributed)
  const getContributionData = () => {
    const contributionMap = new Map<string, number>()

    // Initialize all people with 0
    createSplitData.people.forEach((person) => {
      contributionMap.set(person.id, 0)
    })

    // Sum up contributions from all tasks
    createSplitData.tasks.forEach((task) => {
      task.people.forEach((taskPerson) => {
        const currentAmount = contributionMap.get(taskPerson.id) || 0
        contributionMap.set(taskPerson.id, currentAmount + taskPerson.amount)
      })
    })

    // Convert to chart data format with person names
    return Array.from(contributionMap.entries())
      .map(([personId, amount]) => {
        const person = createSplitData.people.find((p) => p.id === personId)
        return {
          value: amount,
          label: person ? person.firstName : 'Unknown',
          id: personId,
        }
      })
      .filter((item) => item.value > 0) // Only show people who contributed
  }

  // Calculate task distribution data (how much each task costs)
  const getTaskDistributionData = () => {
    return createSplitData.tasks.map((task, index) => ({
      value: task.amount,
      label: task.taskName,
      id: `task-${index}`,
    }))
  }

  const data =
    type === 'contribution' ? getContributionData() : getTaskDistributionData()

  // Don't render if no data
  if (data.length === 0) {
    return (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #ccc',
          borderRadius: '8px',
        }}
      >
        <p style={{ color: '#999', fontSize: '14px' }}>
          {type === 'contribution'
            ? 'No contributions yet'
            : 'No tasks added yet'}
        </p>
      </div>
    )
  }

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 80,
          outerRadius: 100,
          paddingAngle: 2,
          cornerRadius: 5,
        },
      ]}
      {...size}
      slotProps={{
        legend: {
          direction: 'horizontal',
          position: { vertical: 'bottom' },
        },
      }}
    >
      <PieCenterLabel>{centerLabel}</PieCenterLabel>
    </PieChart>
  )
}
