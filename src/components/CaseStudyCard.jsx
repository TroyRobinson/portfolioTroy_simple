import React from 'react'
import { FlexCol, FlexRow } from './primitives/FlexLayout.jsx'
import { Tag } from './primitives/Tag.jsx'
import { Button } from './primitives/Button.jsx'
import { Link } from './primitives/Link.jsx'

/**
 * Component for displaying an individual case study
 * @param {Object} props - Component props
 * @param {Object} props.study - The case study data to display
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 */
const CaseStudyCard = ({ study, onDelete }) => {
  // Guard against undefined study
  if (!study) {
    return null
  }

  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '24px',
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '550px',
        width: 'max-content',
        height: 'max-content',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 16,
      }}
    >
      <FlexRow
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '0 0 8px 0',
          width: '100%',
        }}
      >
        <h3
          style={{
            fontSize: '1.3rem',
            padding: '0',
          }}
        >
          {study.name || 'Untitled Study'}
        </h3>
        <span
          style={{
            color: '#666',
            fontSize: '0.9rem',
          }}
        >
          {study.date || ''}
        </span>
      </FlexRow>
      <p
        style={{
          padding: '0 0 16px 0',
          lineHeight: '1.5',
        }}
      >
        {study.description || 'Missing Description'}
      </p>
      <FlexCol
        style={{
          padding: '0',
          gap: 8,
          width: '100%',
        }}
      >
        <h4
          style={{
            fontSize: '0.9rem',
            color: '#666',
            padding: '0 0 8px 0',
          }}
        >
          Technologies
        </h4>
        <FlexRow style={{ flexWrap: 'wrap', gap: '8px' }}>
          {study.technologies &&
            study.technologies
              .split(',')
              .map((tech, index) => (
                <Tag key={index}>{tech.trim()}</Tag>
              ))}
        </FlexRow>
      </FlexCol>
      <FlexRow
        style={{
          gap: '8px',
          width: '100%',
        }}
      >
        <Link
          href={`/portfolio/${
            study.name
              ? study.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')
              : 'untitled'
          }`}
        >
          View Details
        </Link>
        <Button
          onClick={() => onDelete(study)}
          style={{
            backgroundColor: '#f44336',
            fontSize: '0.8rem',
          }}
        >
          Delete
        </Button>
      </FlexRow>
    </div>
  )
}

export default CaseStudyCard
