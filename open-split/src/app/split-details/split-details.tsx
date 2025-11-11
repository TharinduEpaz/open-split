import SplitDataCard from './components/split-data-card'

const dummyData = [
  { id: 1, name: 'Avishka', status: 'UNSETTLED', amount: 12000 },
  { id: 2, name: 'Tharindu', status: 'PAID', amount: 8500 },
  { id: 3, name: 'Kamal', status: 'UNSETTLED', amount: 15000 },
  { id: 4, name: 'Nimal', status: 'PAID', amount: 9000 },
  { id: 5, name: 'Saman', status: 'UNSETTLED', amount: 11200 },
]

const SplitDetails = () => {
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
    {dummyData.map((data) => (
      <SplitDataCard
        key={data.id}
        name={data.name}
        status={data.status}
        amount={data.amount}
        paid={data.status === 'PAID'}
      />
    ))}
  </div>
  )
}

export default SplitDetails