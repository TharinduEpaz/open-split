import { useNavigate } from '@tanstack/react-router'

interface Split {
  id: string
  name: string
  date: string
  amount: number
  totalOwe: number
  bgColor: string
  icon: string
}

const splits: Split[] = [
  { id: '1', name: 'La Luna Dinner', date: '2024-11-01', amount: 40000, totalOwe: 1000, bgColor: 'bg-pink-100', icon: '→' },
  { id: '2', name: 'Keels Shopping', date: '2024-11-03', amount: 40000, totalOwe: 1000, bgColor: 'bg-yellow-50', icon: '→' },
  { id: '3', name: 'Arakku', date: '2024-11-05', amount: 40000, totalOwe: 1000, bgColor: 'bg-purple-100', icon: '→' },
  { id: '4', name: 'Party', date: '2024-11-07', amount: 40000, totalOwe: 1000, bgColor: 'bg-blue-100', icon: '→' },
  { id: '5', name: 'Yogeshwari', date: '2024-11-09', amount: 40000, totalOwe: 1000, bgColor: 'bg-green-100', icon: '→' },
]

export default function MySplitsTable() {
  const navigate = useNavigate()

  const handleViewSplit = (splitId: string) => {
    navigate({ to: '/my-splits/$splitId', params: { splitId } })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {splits.map((split) => (
        <div
          key={split.id}
          onClick={() => handleViewSplit(split.id)}
          className={`${split.bgColor} rounded-2xl border-2 border-gray-800 p-6 flex flex-col justify-between min-h-40 cursor-pointer hover:shadow-lg transition-shadow`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">{split.name}</h2>
              <p className="text-lg font-semibold mb-2">$ {split.amount.toLocaleString()}</p>
              <p className="text-red-400 font-semibold">Total owe ${split.totalOwe.toLocaleString()}</p>
            </div>
            <div className="text-3xl font-bold text-gray-800">{split.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
