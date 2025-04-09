import React from 'react'
import { FlexCol, FlexRow } from './primitives/FlexLayout.jsx'
import { Tag } from './primitives/Tag.jsx'
import { Button } from './primitives/Button.jsx'
import { Link } from './primitives/Link.jsx'

/**
 * Displays an individual case study with details and action buttons
 */
const CaseStudyCard = ({ study, onDelete }) => {
  if (!study) return null

  return (
    <div
      style={{
        border: '1px solid #000',
        padding: '8px',
        backgroundColor: '#e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        gap: 8,
      }}
    >
      <FlexRow
        style={{
          justifyContent: 'space-between',
          padding: '0 0 8px 0',
          width: '100%',
          borderBottom: '1px solid #888',
        }}
      >
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: 'bold',
          fontFamily: 'Chicago, Monaco, monospace',
        }}>
          {study.name || 'Untitled Study'}
        </h3>
        <span style={{ 
          color: '#000', 
          fontSize: '12px',
          fontFamily: 'Chicago, Monaco, monospace',
        }}>
          {study.date || ''}
        </span>
      </FlexRow>
      
      <p style={{ 
        padding: '0', 
        lineHeight: '1.4',
        fontSize: '12px',
        fontFamily: 'Chicago, Monaco, monospace',
      }}>
        {study.description || 'Missing Description'}
      </p>
      
      <FlexCol style={{ padding: '0', gap: 4, width: '100%' }}>
        <h4 style={{ 
          fontSize: '12px', 
          fontWeight: 'bold',
          color: '#000', 
          padding: '0',
          fontFamily: 'Chicago, Monaco, monospace',
        }}>
          Technologies
        </h4>
        <FlexRow style={{ flexWrap: 'wrap', gap: '4px' }}>
          {study.technologies &&
            study.technologies
              .split(',')
              .map((tech, index) => (
                <Tag 
                  key={index}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #000',
                    color: '#000',
                    fontSize: '10px',
                    padding: '2px 4px',
                    fontFamily: 'Chicago, Monaco, monospace',
                  }}
                >
                  {tech.trim()}
                </Tag>
              ))}
        </FlexRow>
      </FlexCol>
      
      <FlexRow style={{ gap: '8px', width: '100%', marginTop: '4px' }}>
        <Link
          href={`/portfolio/${
            study.name
              ? study.name.toLowerCase().replace(/\s+/g, '-')
              : 'untitled'
          }`}
          buttonStyle={{ 
            fontSize: '12px',
            backgroundColor: '#e8e8e8',
            border: '1px solid #000',
            borderRadius: '0',
            color: '#000',
            padding: '4px 8px',
            fontFamily: 'Chicago, Monaco, monospace',
            textDecoration: 'none',
            boxShadow: '1px 1px 0px #000',
          }}
        >
          View Details
        </Link>
        <Button
          onClick={() => onDelete(study)}
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
          Delete
        </Button>
      </FlexRow>
    </div>
  )
}

export default CaseStudyCard
