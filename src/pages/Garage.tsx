import { useState, useEffect } from 'react'
import { Track } from '../components'
import { Car, CarProps } from '../types/types'

import generateColor from '../utils/generateColor'
import genereateCar from '../utils/generateCar'

import {
  useCreateCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
  useGetCarsQuery,
} from '../services/GarageService'
import {
  useStartCarMutation,
  useStopCarMutation,
} from '../services/EngineService'
import {
  useCreateWinnerMutation,
  useUpdateWinnerMutation,
  useLazyGetWinnerQuery,
} from '../services/WinnersService'

const Garage = () => {
  const [cars, setCars] = useState<CarProps[]>([])
  const [newCar, setNewCar] = useState<Car>({ name: '', color: '#000000' })
  const [editCar, setEditCar] = useState<Car>({ name: '', color: '#000000' })
  const [selectCar, setSelectCar] = useState<number | null>(null)
  const [page, setPage] = useState<number>(1)
  const [totalCars, setTotalCars] = useState<number>(0)
  const [isRaceCompleted, setIsRaceCompleted] = useState<boolean>(false)

  const [deleteCar] = useDeleteCarMutation()
  const [updateCar] = useUpdateCarMutation()
  const [createCar] = useCreateCarMutation()
  const [startCar] = useStartCarMutation()
  const [stopCar] = useStopCarMutation()

  const [createWinner] = useCreateWinnerMutation()
  const [updateWinner] = useUpdateWinnerMutation()
  const [getWinner] = useLazyGetWinnerQuery()

  const { data, refetch } = useGetCarsQuery({
    page: page,
    limit: 7,
  })

  useEffect(() => {
    if (data) {
      const initialCars = data.cars.map((car) => ({
        id: car.id,
        name: car.name,
        color: car.color,
        velocity: null,
        distance: null,
      }))
      setCars(initialCars)
      setTotalCars(data.totalCount)
    }
  }, [data])

  const handleStart = async (id: number) => {
    try {
      const { data } = await startCar(id)
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === id
            ? { ...car, velocity: data!.velocity, distance: data!.distance }
            : car
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleRace = async () => {
    if (isRaceCompleted) return alert('Reset cars to start a new race')
    try {
      const raceResults = await Promise.all(
        cars.map(async (car) => {
          const { data } = await startCar(car.id!)
          return {
            ...car,
            velocity: data!.velocity,
            distance: data!.distance,
          }
        })
      )

      setCars(raceResults)

      const winner = raceResults.reduce((prev, current) => {
        return current.distance! / current.velocity! <
          prev.distance! / prev.velocity!
          ? current
          : prev
      })

      const winnerTime = winner.distance! / winner.velocity!

      try {
        const existingWinnerResponse = await getWinner(winner.id!).unwrap()
        const existingWinner = existingWinnerResponse

        const updatedWinner = {
          id: existingWinner.id,
          wins: existingWinner.wins + 1,
          time: Math.min(existingWinner.time, winnerTime),
        }

        await updateWinner(updatedWinner)
      } catch (error) {
        await createWinner({
          id: winner.id!,
          wins: 1,
          time: winnerTime,
        })
      }

      setIsRaceCompleted(true)
    } catch (error) {
      console.error('Error starting cars:', error)
    }
  }

  const handleReset = async () => {
    if (!isRaceCompleted) return alert('Cars are already reset')
    try {
      await Promise.all(
        cars.map(async (car) => {
          const { data } = await stopCar(car.id!)
          setCars((prevCars) =>
            prevCars.map((prevCar) =>
              prevCar.id === car.id
                ? {
                    ...prevCar,
                    velocity: data!.velocity,
                    distance: data!.distance,
                  }
                : prevCar
            )
          )
        })
      )

      setIsRaceCompleted(false)
    } catch (error) {
      console.error('Error stopping cars:', error)
    }
  }

  const handleStop = async (id: number) => {
    const { data } = await stopCar(id)
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === id
          ? { ...car, velocity: data!.velocity, distance: data!.distance }
          : car
      )
    )
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id)
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (car: Car, id: number | null) => {
    if (!id) return alert('Please select a car first')
    if (!car.name) return alert('Please enter a name')
    try {
      await updateCar({ car, id })
      setEditCar({ name: '', color: '#000000' })
      setSelectCar(null)
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreate = async ({ name, color = '#000000' }: Car) => {
    if (!name) return alert('Please enter at least a name')
    try {
      await createCar({ name, color })
      setNewCar({ name: '', color: '#000000' })
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGenerateCars = async () => {
    for (let i = 0; i < 100; i++) {
      await createCar({
        name: genereateCar(),
        color: generateColor(),
      })
    }
    refetch()
  }

  const handleNextPage = async () => {
    if (page >= Math.ceil(totalCars / 7)) return alert('No more pages')
    setPage((prev) => prev + 1)
    setIsRaceCompleted(false)
  }

  const handlePreviousPage = async () => {
    if (page <= 1) return alert('No more pages')
    setPage((prev) => prev - 1)
    setIsRaceCompleted(false)
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between w-full md:w-[80%] mx-auto">
        {/* BUTTONS */}
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <button
            className="px-4 py-2 text-green-500 text-base md:text-lg border border-green-500 rounded uppercase"
            onClick={handleRace}
          >
            Race
          </button>
          <button
            className="px-4 py-2 text-purple-500 text-base md:text-lg border border-purple-500 rounded uppercase"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {/* CREATE CAR */}
        <div className="flex items-center justify-center gap-2 md:justify-start mt-4 md:mt-0">
          <input
            id="newCarName"
            type="text"
            className="h-8 rounded"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          />
          <input
            id="newCarColor"
            type="color"
            name=""
            className="w-7"
            value={newCar.color}
            onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
          />
          <button
            className="px-4 py-2 text-base md:text-lg border rounded uppercase text-purple-500 border-purple-500"
            onClick={() => handleCreate(newCar)}
          >
            Create
          </button>
        </div>

        {/* UPDATE CAR */}
        <div className="flex items-center justify-center gap-2 md:justify-start mt-4 md:mt-0">
          <input
            id="editCarName"
            type="text"
            className="h-8 rounded"
            value={editCar.name}
            onChange={(e) => setEditCar({ ...editCar, name: e.target.value })}
          />
          <input
            id="editCarColor"
            type="color"
            name=""
            className="w-7"
            value={editCar.color}
            onChange={(e) => setEditCar({ ...editCar, color: e.target.value })}
          />
          <button
            className="px-4 py-2 text-purple-500 text-base md:text-lg border border-purple-500 rounded uppercase"
            onClick={() => handleUpdate(editCar, selectCar)}
          >
            Update
          </button>
        </div>

        {/* GENERATE CARS */}
        <div className="flex items-center justify-center gap-2 md:justify-start mt-4 md:mt-0">
          <button
            className="px-4 py-2 text-green-500 text-base md:text-lg border border-green-500 rounded uppercase"
            onClick={handleGenerateCars}
          >
            Generate Cars
          </button>
        </div>
      </div>

      {/* CARS */}
      <div className="pt-10">
        <div className="flex flex-col gap-4 items-center justify-between w-full md:w-[80%] mx-auto">
          {cars?.map((car) => (
            <Track
              key={car.id}
              car={car}
              selectCar={selectCar}
              setSelectCar={setSelectCar}
              handleDelete={handleDelete}
              handleStartCar={handleStart}
              handleStopCar={handleStop}
            />
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center my-5">
        <button
          className="px-4 py-2 mr-2 bg-gray-300 rounded"
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          className="px-4 py-2 ml-2 bg-gray-300 rounded"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Garage
