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

  // Common styles for form inputs
  const inputStyle = {
    padding: '4px',
    border: '1px solid #000',
    borderRadius: '0',
    backgroundColor: '#fff',
    fontFamily: 'Chicago, Monaco, monospace',
    fontSize: '12px',
  }

  return (
    <form onSubmit={handleSubmit}>
      <FlexCol style={{ gap: '12px' }}>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontFamily: 'Chicago, Monaco, monospace',
          }}
        >
          <span style={{ 
            fontWeight: 'bold',
            fontSize: '12px',
          }}>
            Project Name
          </span>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontFamily: 'Chicago, Monaco, monospace',
          }}
        >
          <span style={{ 
            fontWeight: 'bold',
            fontSize: '12px',
          }}>
            Description
          </span>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            style={{
              ...inputStyle,
              resize: 'vertical',
            }}
          />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontFamily: 'Chicago, Monaco, monospace',
          }}
        >
          <span style={{ 
            fontWeight: 'bold',
            fontSize: '12px',
          }}>
            Technologies (comma separated)
          </span>
          <input
            type='text'
            name='technologies'
            value={formData.technologies}
            onChange={handleInputChange}
            required
            placeholder='React, Node.js, GraphQL'
            style={inputStyle}
          />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontFamily: 'Chicago, Monaco, monospace',
          }}
        >
          <span style={{ 
            fontWeight: 'bold',
            fontSize: '12px',
          }}>
            Date
          </span>
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleInputChange}
            style={inputStyle}
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
            onClick={(e) => onCancel && onCancel(e)}
            style={{
              backgroundColor: '#e8e8e8',
              border: '1px solid #000',
              borderRadius: '0',
              color: '#000',
              padding: '4px 8px',
              fontSize: '12px',
              fontFamily: 'Chicago, Monaco, monospace',
              boxShadow: '1px 1px 0px #000',
            }}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            style={{
              backgroundColor: '#e8e8e8',
              border: '1px solid #000',
              borderRadius: '0',
              color: '#000',
              padding: '4px 8px',
              fontSize: '12px',
              fontFamily: 'Chicago, Monaco, monospace',
              boxShadow: '1px 1px 0px #000',
            }}
          >
            Add Case Study
          </Button>
        </FlexRow>
      </FlexCol>
    </form>
  )
}

export default CaseStudyForm 