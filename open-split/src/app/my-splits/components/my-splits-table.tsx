import { OutlinedButton } from '@/components/ui/common/outlined-button'
import { useNavigate } from '@tanstack/react-router'
import { KanbanSquare } from 'lucide-react'

interface Split {
  id: string
  name: string
  date: string
}

const splits: Split[] = [
  { id: '1', name: 'Weekend Trip to Bali', date: '2024-11-01' },
  { id: '2', name: 'Office Lunch', date: '2024-11-03' },
  { id: '3', name: 'Movie Night', date: '2024-11-05' },
  { id: '4', name: 'Camping Adventure', date: '2024-11-07' },
]

export default function MySplitsTable() {
  const navigate = useNavigate()

  const handleViewSplit = (splitId: string) => {
    navigate({ to: '/my-splits/$splitId', params: { splitId } })
  }

  return (
    <div className="relative overflow-x-auto bg-background-default shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <caption className="p-5 text-lg font-medium text-left rtl:text-right text-heading">
          My Splits
          <p className="mt-1.5 text-sm font-normal text-body">Browse a list of your expense splits. View details and manage your shared expenses.</p>
        </caption>
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Split Name
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Date
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {splits.map((split, index) => (
            <tr
              key={split.id}
              className={`bg-neutral-primary-soft ${
                index !== splits.length - 1 ? 'border-b border-default' : ''
              }`}
            >
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {split.name}
              </th>
              <td className="px-6 py-4">
                {split.date}
              </td>
              <td className="px-6 py-4 text-right">
                <OutlinedButton 
                  size="small"
                  startIcon={<KanbanSquare size={16} />}
                  onClick={() => handleViewSplit(split.id)}
                >
                  View Split Details
                </OutlinedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
