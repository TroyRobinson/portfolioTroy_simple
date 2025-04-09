import React, { useState } from 'react'
import { FlexCol, FlexRow } from '../utils.jsx'

/**
 * Form component for adding or editing case studies
 * @param {Object} props - Component props
 * @param {Object} props.initialValues - Initial values for the form
 * @param {Function} props.onSubmit - Function to call when form is submitted
 * @param {React.MouseEventHandler<HTMLButtonElement>} props.onCancel - Function to call when cancel button is clicked
 */
const CaseStudyForm = ({ initialValues = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: '',
    date: '',
    ...initialValues,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.technologies) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FlexCol style={{ gap: '15px' }}>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>
            Project Name
          </span>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>
            Description
          </span>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical',
            }}
          />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>
            Technologies (comma separated)
          </span>
          <input
            type='text'
            name='technologies'
            value={formData.technologies}
            onChange={handleInputChange}
            required
            placeholder='React, Node.js, GraphQL'
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>
            Date
          </span>
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleInputChange}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
        <FlexRow
          style={{
            justifyContent: 'flex-end',
            gap: '10px',
            padding: '10px 0 0 0',
          }}
        >
          <button
            type='button'
            onClick={onCancel}
            style={{
              padding: '10px 15px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type='submit'
            style={{
              padding: '10px 15px',
              backgroundColor: '#2b6cb0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Add Case Study
          </button>
        </FlexRow>
      </FlexCol>
    </form>
  )
}

export default CaseStudyForm 