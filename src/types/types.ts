export interface Car {
  id?: number
  name: string
  color: string
}

export interface CarProps {
  id?: number
  name: string
  color: string
  velocity: number | null
  distance: number | null
}

export interface DriveEngineResponse {
  success: boolean
}

export interface StartOrStopResponse {
  velocity: number
  distance: number
}

export interface Winner {
  id: number
  wins: number
  time: number
  car?: Car
}

export type TrackProps = {
  car: CarProps
  selectCar: number | null
  setSelectCar: (carID: number) => void
  handleDelete: (id: number) => void
  handleStartCar: (id: number) => void
  handleStopCar: (id: number) => void
}
