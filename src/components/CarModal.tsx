import React from 'react'
import { ModalProps } from '../types/types'

const Modal: React.FC<ModalProps> = ({
  isOpen,
  winnerName,
  winnerTime,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Race Winner!</h2>
        <p className="mb-4">Name: {winnerName}</p>
        <p className="mb-4">Time: {(winnerTime / 1000).toFixed(2)} seconds</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
