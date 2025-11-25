import { useCreateSplit } from '../state/use-create-split'

interface SimplifiedDebt {
  from: string
  to: string
  amount: number
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

const useSplitAlgorithm = () => {
  const { createSplitData: _createSplitData } = useCreateSplit()

  /**
   * Generates a shareable link for the split
   * @returns The generated link string
   */
  const generateLink = (): string => {
    // TODO: Implement link generation logic
    return ''
  }

  /**
   * Simplifies debts between people to minimize transactions
   * @returns Array of simplified debts showing who owes whom and how much
   */
  const simplifyDebts = (): SimplifiedDebt[] => {
    // TODO: Implement debt simplification algorithm
    return []
  }

  /**
   * Validates tasks to ensure amounts and people are correct
   * @param taskIndex Optional index of specific task to validate. If not provided, validates all tasks
   * @returns Validation result with isValid flag and array of error messages
   */
  const validateTask = (_taskIndex?: number): ValidationResult => {
    // TODO: Implement task validation logic
    const { tasks } = _createSplitData
    const errors: string[] = []

    if (!tasks || tasks.length === 0) {
      errors.push('No tasks added')
    }

    tasks.forEach(task=>{
        let total = 0;
        task.people.forEach(person=>{
            total += person.amount;
        })
        if (total !== task.amount) {
            errors.push(`Task ${task.taskName} amount does not match the sum of people amounts`)
        }
    })

    if (errors.length > 0) {
      return {
        isValid: false,
        errors,
      }
    }

    return {
      isValid: true,
      errors: [],
    }
  }

  return {
    generateLink,
    simplifyDebts,
    validateTask,
  }
}

export default useSplitAlgorithm