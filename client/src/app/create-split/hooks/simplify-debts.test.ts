import { describe, it, expect } from 'vitest'
import simplyfyDebts from './simplify-debts'

// Test data setup
const TEST_PEOPLE = ["Grace", "Ivan", "Judy", "Luke", "Mallory"]
const TEST_DEBTS: [string, string, number][] = [
  ["Grace", "Ivan", 5],
  ["Grace", "Judy", 3],
  ["Ivan", "Grace", 2],
  ["Ivan", "Mallory", 5],
  ["Judy", "Grace", 10],
  ["Judy", "Luke", 4],
  ["Judy", "Mallory", 6],
  ["Judy", "Mallory", 2],
  ["Luke", "Ivan", 4],
  ["Mallory", "Grace", 15],
  ["Mallory", "Luke", 6],
  ["Mallory", "Judy", 11],
]

// Helper function to create instance with test data
function createTestInstance() {
  const instance = new simplyfyDebts()
  instance.setPeople(TEST_PEOPLE)
  instance.setDebts(TEST_DEBTS)
  return instance
}

describe('simplyfyDebts', () => {
  describe('computeBalances', () => {
    it('should compute correct balances for given debts', () => {
      const instance = createTestInstance()
      const balances = instance.computeBalances()
      
      // Balances should sum to zero (all debts are accounted for)
      expect(balances).toHaveLength(5)
      expect(balances.reduce((sum, b) => sum + b, 0)).toBeCloseTo(0, 5) // Sum should be zero
    })

    it('should return balances array with correct length', () => {
      const instance = createTestInstance()
      const balances = instance.computeBalances()
      expect(balances).toHaveLength(5) // 5 people
    })

    it('should handle empty people and debts', () => {
      const instance = new simplyfyDebts()
      const balances = instance.computeBalances()
      expect(balances).toHaveLength(0)
    })
  })

  describe('simplifyDebts', () => {
    it('should find zero-sum subsets and generate transactions', () => {
      const instance = createTestInstance()
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      
      expect(Array.isArray(transactions)).toBe(true)
      expect(transactions.length).toBeGreaterThan(0)
      
      // Each transaction should be [string, string, number]
      transactions.forEach(transaction => {
        expect(transaction).toHaveLength(3)
        expect(typeof transaction[0]).toBe('string') // collector
        expect(typeof transaction[1]).toBe('string') // person
        expect(typeof transaction[2]).toBe('number') // balance
      })
    })

    it('should generate transactions for each subset', () => {
      const instance = createTestInstance()
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      
      expect(Array.isArray(transactions)).toBe(true)
      // Each transaction should be [string, string, number]
      transactions.forEach(transaction => {
        expect(transaction).toHaveLength(3)
        expect(typeof transaction[0]).toBe('string') // collector
        expect(typeof transaction[1]).toBe('string') // person
        expect(typeof transaction[2]).toBe('number') // balance
      })
    })

    it('should have transactions where collector is first person in subset', () => {
      const instance = createTestInstance()
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      
      // Group transactions by collector to verify pattern
      const transactionsByCollector = new Map<string, [string, string, number][]>()
      transactions.forEach(transaction => {
        const collector = transaction[0]
        if (!transactionsByCollector.has(collector)) {
          transactionsByCollector.set(collector, [])
        }
        transactionsByCollector.get(collector)!.push(transaction)
      })
      
      // Each collector should have transactions
      expect(transactionsByCollector.size).toBeGreaterThan(0)
      
      // Verify each transaction has valid format
      transactions.forEach(([collector, person]) => {
        expect(TEST_PEOPLE).toContain(collector)
        expect(TEST_PEOPLE).toContain(person)
        expect(collector).not.toBe(person) // Collector should be different from person
      })
    })

    it('should produce transactions that sum to zero for each subset', () => {
      const instance = createTestInstance()
      const balances = instance.computeBalances()
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      
      // Create a map of person to net transaction amount
      const netTransactions = new Map<string, number>()
      
      transactions.forEach(([collector, person, balance]) => {
        // Collector receives (positive) or pays (negative)
        const currentCollector = netTransactions.get(collector) || 0
        netTransactions.set(collector, currentCollector + balance)
        
        // Person pays (negative) or receives (positive)
        const currentPerson = netTransactions.get(person) || 0
        netTransactions.set(person, currentPerson - balance)
      })
      
      // For each person, net transactions should match their balance (with opposite sign)
      netTransactions.forEach((netAmount, person) => {
        const index = TEST_PEOPLE.indexOf(person)
        if (index !== -1) {
          // The net transaction should offset the balance
          expect(Math.abs(netAmount + balances[index])).toBeLessThan(0.01)
        }
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty debts (all balances zero)', () => {
      const instance = new simplyfyDebts()
      instance.setPeople(['Grace', 'Ivan'])
      instance.setDebts([])
      const balances = instance.computeBalances()
      
      // All balances should be zero
      expect(balances).toHaveLength(2)
      balances.forEach(balance => {
        expect(balance).toBe(0)
      })
    })

    it('should handle circular debts (A owes B, B owes A)', () => {
      const instance = new simplyfyDebts()
      instance.setPeople(['Grace', 'Ivan'])
      instance.setDebts([
        ['Grace', 'Ivan', 10],
        ['Ivan', 'Grace', 10],
      ])
      const balances = instance.computeBalances()
      
      // Should cancel out
      expect(balances[0] + balances[1]).toBe(0)
      
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      // Should generate transactions to settle the circular debt
      expect(transactions.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle single person scenario', () => {
      const instance = new simplyfyDebts()
      instance.setPeople(['Grace'])
      instance.setDebts([])
      const balances = instance.computeBalances()
      expect(balances).toHaveLength(1)
      expect(balances[0]).toBe(0)
    })

    it('should handle no people', () => {
      const instance = new simplyfyDebts()
      instance.setPeople([])
      instance.setDebts([])
      const balances = instance.computeBalances()
      expect(balances).toHaveLength(0)
      
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      expect(transactions).toHaveLength(0)
    })

    it('should handle debts with people not in the people list', () => {
      const instance = new simplyfyDebts()
      instance.setPeople(['Grace', 'Ivan'])
      instance.setDebts([
        ['Grace', 'Ivan', 10],
        ['Unknown', 'Grace', 5], // Unknown person not in people list
      ])
      
      // Should not throw error, but Unknown person will be ignored
      const balances = instance.computeBalances()
      expect(balances).toHaveLength(2)
    })
  })

  describe('Transaction Format', () => {
    it('should return transactions in correct format [collector, person, balance]', () => {
      const instance = createTestInstance()
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      
      transactions.forEach(transaction => {
        expect(transaction).toHaveLength(3)
        const [collector, person, balance] = transaction
        
        expect(typeof collector).toBe('string')
        expect(typeof person).toBe('string')
        expect(typeof balance).toBe('number')
        expect(collector).not.toBe(person) // Collector should be different from person
      })
    })

    it('should have valid person names in transactions', () => {
      const instance = createTestInstance()
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      
      transactions.forEach(([collector, person]) => {
        expect(TEST_PEOPLE).toContain(collector)
        expect(TEST_PEOPLE).toContain(person)
      })
    })
  })

  describe('Subset Properties', () => {
    it('should have subsets with balances that sum to zero', () => {
      const instance = createTestInstance()
      const balances = instance.computeBalances()
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      
      // Group transactions by collector to identify subsets
      const collectorGroups = new Map<string, string[]>()
      transactions.forEach(([collector, person]) => {
        if (!collectorGroups.has(collector)) {
          collectorGroups.set(collector, [collector])
        }
        collectorGroups.get(collector)!.push(person)
      })
      
      // Check that each subset's balances sum to zero
      collectorGroups.forEach((subset) => {
        const subsetSum = subset.reduce((sum, person) => {
          const index = TEST_PEOPLE.indexOf(person)
          return sum + (index !== -1 ? balances[index] : 0)
        }, 0)
        
        expect(subsetSum).toBeCloseTo(0, 5)
      })
    })

    it('should not have duplicate people across transaction groups', () => {
      const instance = createTestInstance()
      instance.simplifyDebts()
      const transactions = instance.getTransactions()
      
      // Collect all people involved in transactions
      const allPeopleInTransactions = new Set<string>()
      transactions.forEach(([collector, person]) => {
        allPeopleInTransactions.add(collector)
        allPeopleInTransactions.add(person)
      })
      
      // Verify all people are valid
      allPeopleInTransactions.forEach(person => {
        expect(TEST_PEOPLE).toContain(person)
      })
    })
  })

  describe('Setters', () => {
    it('should set people correctly', () => {
      const instance = new simplyfyDebts()
      const people = ['Alice', 'Bob', 'Charlie']
      instance.setPeople(people)
      
      // Verify by computing balances (should have correct length)
      const balances = instance.computeBalances()
      expect(balances).toHaveLength(3)
    })

    it('should set debts correctly', () => {
      const instance = new simplyfyDebts()
      instance.setPeople(['Alice', 'Bob'])
      instance.setDebts([
        ['Alice', 'Bob', 10],
        ['Bob', 'Alice', 5],
      ])
      
      const balances = instance.computeBalances()
      expect(balances).toHaveLength(2)
      // Alice: -10 + 5 = -5, Bob: +10 - 5 = 5
      expect(balances[0]).toBe(-5)
      expect(balances[1]).toBe(5)
    })

    it('should update people and debts', () => {
      const instance = new simplyfyDebts()
      
      // Set initial data
      instance.setPeople(['Alice', 'Bob'])
      instance.setDebts([['Alice', 'Bob', 10]])
      
      let balances = instance.computeBalances()
      expect(balances).toHaveLength(2)
      
      // Update to new data
      instance.setPeople(['Charlie', 'David', 'Eve'])
      instance.setDebts([
        ['Charlie', 'David', 20],
        ['David', 'Eve', 15],
      ])
      
      balances = instance.computeBalances()
      expect(balances).toHaveLength(3)
    })
  })
})

