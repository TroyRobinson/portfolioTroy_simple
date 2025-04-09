import React, { useState } from 'react'
import { FlexCol, FlexRow } from './primitives/FlexLayout.jsx'
import { Button } from './primitives/Button.jsx'

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
      <FlexCol style={{ gap: '16px' }}>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
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
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
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
              padding: '8px',
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
            gap: '8px',
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
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
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
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
        <FlexRow
          style={{
            justifyContent: 'flex-end',
            gap: '8px',
            padding: '8px 0 0 0',
          }}
        >
          <Button
            onClick={onCancel}
            style={{
              backgroundColor: '#f3f4f6',
              color: '#333',
            }}
          >
            Cancel
          </Button>
          <Button
            type='submit'
          >
            Add Case Study
          </Button>
        </FlexRow>
      </FlexCol>
    </form>
  )
}

export default CaseStudyForm 