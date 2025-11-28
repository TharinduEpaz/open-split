import { useNavigate } from '@tanstack/react-router'

interface Person {
  id: string
  name: string
  status: 'fully-settled' | 'unsettled' | 'partially-settled'
  amountPaid: number
  amountToPay: number
}

const people: Person[] = [
  { id: '1', name: 'Tharindu Epasingha', status: 'fully-settled', amountPaid: 10000, amountToPay: 0 },
  { id: '2', name: 'John Doe', status: 'unsettled', amountPaid: 0, amountToPay: 10000 },
  { id: '3', name: 'Jane Smith', status: 'fully-settled', amountPaid: 10000, amountToPay: 0 },
  { id: '4', name: 'Mike Wilson', status: 'partially-settled', amountPaid: 5000, amountToPay: 5000 },
]

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'fully-settled':
      return 'FULLY SETTLED'
    case 'unsettled':
      return 'UNSETTLED'
    case 'partially-settled':
      return 'PARTIALLY SETTLED'
    default:
      return status.toUpperCase()
  }
}

const getStatusBadgeClasses = (status: string): string => {
  switch (status) {
    case 'fully-settled':
      return 'inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20'
    case 'unsettled':
      return 'inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20'
    case 'partially-settled':
      return 'inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20'
    default:
      return 'inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20'
  }
}

// Background colors based on payment status
const getStatusBgColor = (status: string): string => {
  switch (status) {
    case 'fully-settled':
      return 'bg-green-100' // Green
    case 'unsettled':
      return 'bg-red-100' // Red
    case 'partially-settled':
      return 'bg-yellow-100' // Yellow
    default:
      return 'bg-gray-100' // Gray
  }
}

export default function SplitDetailTable() {
  const navigate = useNavigate()
  const handleViewPerson = (personName: string) => {
    navigate({
      to: '/my-splits/$splitId/$payerName',
      from: '/my-splits/$splitId',
      params: {
        payerName: personName,
      },
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-heading mb-2">
          Split Details
        </h2>
        <p className="text-sm font-normal text-body">
          Please select your name and settle the pending amount.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person) => {
          const bgColor = getStatusBgColor(person.status)
          return (
            <div
              key={person.id}
              onClick={() => handleViewPerson(person.name)}
              className={`${bgColor} rounded-2xl border-2 border-gray-800 p-6 flex flex-col justify-between min-h-40 cursor-pointer hover:shadow-lg transition-shadow`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{person.name}</h2>
                  <span className={getStatusBadgeClasses(person.status)}>
                    {getStatusLabel(person.status)}
                  </span>
                  <div className="mt-4 space-y-2">
                    <p className="text-lg font-semibold">
                      Paid: ${person.amountPaid.toLocaleString()}
                    </p>
                    <p className="text-lg font-semibold">
                      Due: ${person.amountToPay.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
