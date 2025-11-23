interface DebtRow {
  name: string
  shouldPay: string
  amount: number
}

const rows: DebtRow[] = [
  { name: 'Tharindu', shouldPay: 'Sandaru', amount: 6.0 },
  { name: 'Pubudu', shouldPay: 'Sandaru', amount: 9.0 },
  { name: 'Manchi', shouldPay: 'Tharindu', amount: 16.0 },
]

export default function DebtTable() {
  return (
    <div className="relative overflow-x-auto bg-background-default shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <caption className="p-5 text-lg font-medium text-left rtl:text-right text-heading">
          Debt Summary
          <p className="mt-1.5 text-sm font-normal text-body">Tap 'Simplify Debts' to see the optimized payment plan.</p>
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
          {rows.map((row, index) => (
            <tr
              key={row.name}
              className={`bg-neutral-primary-soft ${
                index !== rows.length - 1 ? 'border-b border-default' : ''
              }`}
            >
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {row.name}
              </th>
              <td className="px-6 py-4">
                {row.shouldPay}
              </td>
              <td className="px-6 py-4">
                {row.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
