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
            fontSize: '12px',
            color: '#000',
            backgroundColor: '#fff',
            padding: '4px 8px',
            border: '1px solid #000',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Chicago, Monaco, monospace',
          }}
        >
          {isLoading && <Spinner />}
          <span>{status}</span>
        </div>
      )}
      {error && (
        <div
          style={{
            color: '#000',
            backgroundColor: '#fff',
            padding: '4px 8px',
            border: '1px solid #000',
            marginBottom: '8px',
            fontFamily: 'Chicago, Monaco, monospace',
            fontSize: '12px',
          }}
        >
          Error: {error}
        </div>
      )}
    </>
  )
}

export default StatusMessage 