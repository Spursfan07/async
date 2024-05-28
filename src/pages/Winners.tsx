import { useMemo } from 'react'
import { garageAPI } from '../services/GarageService'
import { winnersAPI } from '../services/WinnersService'
import { Car } from '../types/types'
import { Car as CarComponent } from '../components/'

const Winners = () => {
  const { data: cars } = garageAPI.useGetCarsQuery({
    page: 1,
    limit: 10,
  })
  const { data: winners } = winnersAPI.useGetWinnersQuery({
    page: 1,
    limit: 10,
    order: 'DESC',
  })

  console.log(winners)

  const winnerData = useMemo(() => {
    if (!winners || !cars) return []
    return winners.map((winner) => {
      const car = cars.cars.find((car: Car) => car.id === winner.id) || {
        name: 'Unknown',
        color: '#000000',
      }
      return {
        ...winner,
        name: car.name,
        color: car.color,
      }
    })
  }, [winners, cars])
  console.log(winnerData)

  return (
    <div>
      <div className="w-[80%] mx-auto">
        <h2 className="text-4xl font-bold text text-purple-500 underline">
          Winners
        </h2>
        <table className="mt-10 w-full table-fixed text-gray-400 text-start">
          <thead className="h-10 text-2xl">
            <tr className="text-start">
              <th className="text-start">№</th>
              <th className="text-start">Car</th>
              <th className="text-start">Name</th>
              <th className="text-green-400 text-start">Wins</th>
              <th className="text-yellow-300 text-start">Best Times</th>
            </tr>
          </thead>
          <tbody>
            {winnerData?.map((winner) => (
              <tr key={winner.id} className="text-xl h-5">
                <td>{winner.id}</td>
                <td>
                  <div className="w-14">
                    <CarComponent color={winner.color} width={64} />
                  </div>
                </td>
                <td>{winner.name}</td>
                <td>{winner.wins}</td>
                <td>{(winner.time / 1000).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Winners
