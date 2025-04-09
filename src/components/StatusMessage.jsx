import React from 'react'
import Spinner from './Spinner'

/**
 * Component for displaying status and error messages
 * @param {Object} props - Component props
 * @param {string} props.status - Status message to display
 * @param {string} props.error - Error message to display
 * @param {boolean} props.isLoading - Whether a loading indicator should be shown
 */
const StatusMessage = ({ status, error, isLoading }) => {
  return (
    <>
      {status && (
        <div
          style={{
            fontSize: '0.9rem',
            color: '#4a5568',
            backgroundColor: '#edf2f7',
            padding: '5px 10px',
            borderRadius: '4px',
            marginTop: '5px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isLoading && <Spinner />}
          <span>{status}</span>
        </div>
      )}
      {error && (
        <div
          style={{
            color: 'red',
            backgroundColor: '#ffeeee',
            padding: '10px',
            border: '1px solid #ffcccc',
            borderRadius: '4px',
            marginBottom: '15px',
          }}
        >
          Error: {error}
        </div>
      )}
    </>
  )
}

export default StatusMessage 