import { useCreateSplit } from '../../state/use-create-split'
import useSplitAlgorithm from '../../hooks/use-split-algo'
import { useMemo } from 'react'

export default function DebtTable() {
  const { createSplitData } = useCreateSplit()
  const { simplifyDebts } = useSplitAlgorithm()

  // Calculate debts whenever data changes
  const debts = useMemo(() => {
    const simplifiedDebts = simplifyDebts()
    const getPersonName = (personId: string) => {
      const person = createSplitData.people.find((p) => p.id === personId)
      return person ? person.firstName : 'Unknown'
    }
    return simplifiedDebts.map((debt) => ({
      name: getPersonName(debt.from),
      shouldPay: getPersonName(debt.to),
      amount: debt.amount,
    }))
  }, [createSplitData.tasks, createSplitData.people, simplifyDebts])

  return (
    <div className="relative overflow-x-auto bg-background-default shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <caption className="p-5 text-lg font-medium text-left rtl:text-right text-heading">
          Debt Summary
          <p className="mt-1.5 text-sm font-normal text-body">
            Optimized payment plan showing who should pay whom.
          </p>
        </caption>
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Name
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Should pay to
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {debts.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-body">
                No debts to settle.
              </td>
            </tr>
          ) : (
            debts.map((row, index) => (
              <tr
                key={`${row.name}-${row.shouldPay}-${index}`}
                className={`bg-neutral-primary-soft ${
                  index !== debts.length - 1 ? 'border-b border-default' : ''
                }`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {row.name}
                </th>
                <td className="px-6 py-4">{row.shouldPay}</td>
                <td className="px-6 py-4">${row.amount.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
