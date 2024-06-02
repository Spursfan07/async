import { TrackProps } from '../types/types'
import { Car } from './index'

const Track: React.FC<TrackProps> = ({
  car: { id, name, color, distance, velocity },
  selectCar,
  setSelectCar,
  handleDelete,
  handleStartCar,
  handleStopCar,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="w-full relative mr-28">
          {/* CAR */}
          <div
            className={`absolute top-2 flex-shrink-0 w-full md:w-auto duration-[${
              distance! / velocity!
            }ms] `}
            style={{
              left: `${distance && velocity ? '100%' : '0%'}`,
              transitionDuration: `${distance! / velocity!}ms`,
            }}
          >
            <Car color={color} />
          </div>

          {/* TRACK */}
          <div className="flex-grow ml-[120px] h-full border-l-8 py-5 pl-4 border-y">
            <h3 className="text-4xl md:text-6xl font-extrabold text-gray-400 uppercase">
              {name}
            </h3>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-2">
            <button
              className={`px-2 py-1 text-green-500 text-base md:text-lg border border-green-500 rounded uppercase ${
                id === selectCar && 'border-yellow-300 text-yellow-300'
              }`}
              onClick={() => setSelectCar(id!)}
            >
              Select
            </button>
            <button
              className="px-2 py-1 text-purple-500 text-base md:text-lg border border-purple-500 rounded uppercase"
              onClick={() => handleDelete(id!)}
            >
              Remove
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="px-2 py-1 text-gray-500 text-base md:text-lg border border-gray-500 rounded uppercase"
              onClick={() => {
                handleStartCar(id!)
              }}
            >
              A
            </button>
            <button
              className="px-2 py-1 text-green-500 text-base md:text-lg border border-green-500 rounded uppercase"
              onClick={() => {
                handleStopCar(id!)
              }}
            >
              B
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Track
