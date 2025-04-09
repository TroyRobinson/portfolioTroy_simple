import React from 'react'
import { FlexCol, FlexRow } from '../utils.jsx'
import { Tag } from './primitives/Tag.jsx'
import { Link } from '../Router.jsx'

/**
 * Component for displaying an individual case study
 * @param {Object} props - Component props
 * @param {Object} props.study - The case study data to display
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 */
const CaseStudyCard = ({ study, onDelete }) => {
  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '21px 21px',
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        width: 'max-content',
        height: 'max-content',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 11,
      }}
    >
      <FlexRow
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '0 0 10px 0',
          width: 507,
          height: 35,
        }}
      >
        <h3
          style={{
            fontSize: '1.3rem',
            padding: '0',
          }}
        >
          {study.name}
        </h3>
        <span
          style={{
            color: '#666',
            fontSize: '0.9rem',
          }}
        >
          {study.date}
        </span>
      </FlexRow>
      {study.description && (
        <p
          style={{
            padding: '0 0 15px 0',
            lineHeight: '1.5',
          }}
        >
          {study.description}
        </p>
      )}
      <FlexCol
        style={{
          padding: '0px 0px -6px 0px',
          gap: 8,
          width: 507,
          height: 56.5,
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
        <FlexRow
          style={{ flexWrap: 'wrap', gap: '5px' }}
        >
          {study.technologies
            .split(',')
            .map((tech, index) => (
              <Tag key={index}>{tech.trim()}</Tag>
            ))}
        </FlexRow>
      </FlexCol>
      <FlexRow
        style={{
          gap: '10px',
          width: 507,
          height: 25,
        }}
      >
        <Link
          href={`/portfolio/${study.name
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
          style={{
            backgroundColor: '#2b6cb0',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8rem',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          View Details
        </Link>
        <button
          onClick={() => onDelete(study)}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8rem',
          }}
        >
          Delete
        </button>
      </FlexRow>
    </div>
  )
}

export default CaseStudyCard 