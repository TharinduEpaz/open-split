import { FilledButton } from '@/components/ui/common/filled-button'
import { useNavigate } from '@tanstack/react-router'
import { Handshake } from 'lucide-react'

interface Person {
  id: string
  name: string
  status: 'fully-settled' | 'unsettled' | 'partially-settled'
}

const people: Person[] = [
  { id: '1', name: 'Tharindu Epasingha', status: 'fully-settled' },
  { id: '2', name: 'John Doe', status: 'unsettled' },
  { id: '3', name: 'Jane Smith', status: 'fully-settled' },
  { id: '4', name: 'Mike Wilson', status: 'partially-settled' },
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
    // Handle viewing person details
  }

  return (
    <div className="relative overflow-x-auto bg-background-default shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <caption className="p-5 text-lg font-medium text-left rtl:text-right text-heading">
          Split Details
          <p className="mt-1.5 text-sm font-normal text-body">Please select your name and settle the pending amount.</p>
        </caption>
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Name
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr
              key={person.id}
              className={`bg-neutral-primary-soft ${
                index !== people.length - 1 ? 'border-b border-default' : ''
              }`}
            >
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {person.name}
              </th>
              <td className="px-6 py-4">
                <span className={getStatusBadgeClasses(person.status)}>
                  {getStatusLabel(person.status)}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <FilledButton
                  size="small"
                  startIcon={<Handshake size={16} />}
                  onClick={() => handleViewPerson(person.name)}
                >
                  Settle Debts
                </FilledButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
