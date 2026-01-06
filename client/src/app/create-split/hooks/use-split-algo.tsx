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
    const { tasks, people } = _createSplitData

    if (!tasks || tasks.length === 0 || !people || people.length === 0) {
      return []
    }

    // Step 1: Calculate how much each person has paid (total contributions)
    const paidMap = new Map<string, number>()
    people.forEach((person) => {
      paidMap.set(person.id, 0)
    })

    tasks.forEach((task) => {
      task.people.forEach((taskPerson) => {
        const currentPaid = paidMap.get(taskPerson.id) || 0
        paidMap.set(taskPerson.id, currentPaid + taskPerson.amount)
      })
    })

    // Step 2: Calculate how much each person should pay (total task amounts / number of people)
    const totalTaskAmount = tasks.reduce((sum, task) => sum + task.amount, 0)
    const perPersonShare = totalTaskAmount / people.length

    // Step 3: Calculate net balance for each person (paid - should pay)
    const balanceMap = new Map<string, number>()
    people.forEach((person) => {
      const paid = paidMap.get(person.id) || 0
      balanceMap.set(person.id, paid - perPersonShare)
    })

    // Step 4: Separate creditors (positive balance) and debtors (negative balance)
    const creditors: Array<{ id: string; amount: number }> = []
    const debtors: Array<{ id: string; amount: number }> = []

    balanceMap.forEach((balance, personId) => {
      if (balance > 0.01) {
        // Round to avoid floating point issues
        creditors.push({ id: personId, amount: balance })
      } else if (balance < -0.01) {
        debtors.push({ id: personId, amount: Math.abs(balance) })
      }
    })

    // Step 5: Simplify debts using greedy algorithm
    const simplifiedDebts: SimplifiedDebt[] = []
    let creditorIndex = 0
    let debtorIndex = 0

    while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
      const creditor = creditors[creditorIndex]
      const debtor = debtors[debtorIndex]

      const amount = Math.min(creditor.amount, debtor.amount)

      if (amount > 0.01) {
        // Only add if amount is significant (avoid rounding errors)
        simplifiedDebts.push({
          from: debtor.id,
          to: creditor.id,
          amount: Math.round(amount * 100) / 100, // Round to 2 decimal places
        })
      }

      creditor.amount -= amount
      debtor.amount -= amount

      if (creditor.amount < 0.01) {
        creditorIndex++
      }
      if (debtor.amount < 0.01) {
        debtorIndex++
      }
    }

    return simplifiedDebts
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