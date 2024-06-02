// CAR CLIENT
export interface CarData {
  id?: number
  name: string
  color: string
  velocity: number | null
  distance: number | null
}

// PROPS
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  winnerName: string
  winnerTime: number
}

export type TrackProps = {
  car: CarData
  selectCar: number | null
  setSelectCar: (carID: number) => void
  handleDelete: (id: number) => void
  handleStartCar: (id: number) => void
  handleStopCar: (id: number) => void
}

// API
export interface Car {
  id?: number
  name: string
  color: string
}

export interface DriveEngineResponse {
  success: boolean
}

export interface StartOrStopResponse {
  velocity: number
  distance: number
}

export interface Winner {
  id?: number
  wins: number
  time: number
}
