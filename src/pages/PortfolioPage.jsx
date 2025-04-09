import React, { useState } from 'react'
import { FlexCol, FlexRow } from '../components/primitives/FlexLayout.jsx'
import { Header } from '../components/Header.jsx'
import Spinner from '../components/Spinner.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import CaseStudyForm from '../components/CaseStudyForm.jsx'
import { Button } from '../components/primitives/Button.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'

// Moved keyframes definition to a component that can be inserted once
const PulseAnimation = () => (
  <style>{`
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `}</style>
)

// Skeleton component for loading state
const SkeletonCard = () => (
  <div style={{
    backgroundColor: '#e8e8e8',
    border: '1px solid #000',
    padding: '8px',
    width: '100%',
    animation: 'pulse 1.5s infinite',
  }}>
    <div style={{ 
      height: '24px', 
      width: '40%', 
      backgroundColor: '#c0c0c0', 
      marginBottom: '8px',
      border: '1px solid #000',
    }} />
    <div style={{ 
      height: '80px', 
      width: '100%', 
      backgroundColor: '#c0c0c0',
      marginBottom: '8px',
      border: '1px solid #000',
    }} />
    <div style={{ 
      height: '20px', 
      width: '60%', 
      backgroundColor: '#c0c0c0',
      border: '1px solid #000',
    }} />
  </div>
)

// Classic Mac-style title bar component
const MacTitleBar = ({ title }) => (
  <div style={{
    backgroundColor: '#fff',
    color: '#000',
    padding: '4px 8px',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Chicago, Monaco, monospace',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderBottom: '1px solid #000',
  }}>
    <div style={{ 
      width: '12px', 
      height: '12px', 
      border: '1px solid #000',
      borderRadius: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        backgroundColor: '#000',
      }} />
    </div>
    <span>{title}</span>
    <div style={{ width: '12px' }} />
  </div>
)

// Classic Mac scrollbar component
const MacScrollbar = ({ height = '100%' }) => (
  <div style={{
    width: '16px',
    height,
    backgroundColor: '#e8e8e8',
    border: '1px solid #000',
    borderLeft: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '4px',
    paddingBottom: '4px',
  }}>
    <div style={{
      width: '12px',
      height: '12px',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: '8px solid #000',
      marginBottom: '4px',
    }} />
    <div style={{
      width: '12px',
      height: '40px',
      backgroundColor: '#fff',
      border: '1px solid #000',
      margin: '8px 0',
    }} />
    <div style={{
      width: '12px',
      height: '12px',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '8px solid #000',
      marginTop: '4px',
    }} />
  </div>
)

const PortfolioPage = ({ style = {} }) => {
  const {
    loading,
    error,
    status,
    isClearing,
    caseStudies,
    addCaseStudy,
    deleteCaseStudy,
    deleteAllData,
    resetDatabase,
  } = useCaseStudies()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [newCaseStudy, setNewCaseStudy] = useState({
    name: '',
    description: '',
    technologies: '',
    date: '',
  })
  
  // Number of skeleton cards to show while loading
  const skeletonCount = 5

  const handleAddCaseStudy = (formData) => {
    addCaseStudy(formData)
    setNewCaseStudy({
      name: '',
      description: '',
      technologies: '',
      date: '',
    })
    setDialogOpen(false)
  }

  return (
    <FlexCol
      style={{
        width: '100%',
        maxWidth: '1200px',
        minWidth: '800px',
        minHeight: '100vh',
        padding: '16px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        alignItems: 'flex-start',
        position: 'relative',
        fontFamily: 'Chicago, Monaco, monospace',
        color: '#000',
        backgroundColor: '#e8e8e8',
        ...style,
      }}
    >
      <PulseAnimation />
      <Header
        title='Case Studies'
        style={{ width: '100%', marginBottom: '16px' }}
      />
      
      <FlexCol
        style={{
          border: '2px solid #000',
          backgroundColor: '#e8e8e8',
          width: '100%',
          boxShadow: '2px 2px 0px #000',
        }}
      >
        <MacTitleBar title="Case Studies" />
        
        <FlexRow style={{ width: '100%' }}>
          <FlexCol
            style={{
              padding: '8px',
              width: '100%',
              maxHeight: '600px',
              overflow: 'auto',
            }}
          >
            <FlexRow
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 0 16px 0',
                width: '100%',
                borderBottom: '1px solid #888',
              }}
            >
              <FlexCol style={{ gap: '8px' }}>
                <div
                  style={{ fontSize: '12px', color: '#000' }}
                >
                  {loading ? (
                    <>
                      <Spinner /> Loading...
                    </>
                  ) : (
                    `${caseStudies.length} case studies loaded`
                  )}
                </div>
                <StatusMessage 
                  status={status} 
                  error={error}
                  isLoading={isClearing} 
                />
              </FlexCol>
              <Button
                onClick={() => setDialogOpen(true)}
                style={{
                  opacity: isClearing || loading ? 0.7 : 1,
                  cursor: isClearing || loading ? 'not-allowed' : 'pointer',
                  backgroundColor: '#e8e8e8',
                  border: '1px solid #000',
                  borderRadius: '0px',
                  color: '#000',
                  padding: '4px 8px',
                  fontFamily: 'Chicago, Monaco, monospace',
                  fontSize: '12px',
                  boxShadow: '1px 1px 0px #000',
                }}
              >
                Add New Case Study
              </Button>
            </FlexRow>
            
            {!loading &&
              !error &&
              caseStudies.length === 0 && (
                <div
                  style={{ padding: '16px 0', color: '#000' }}
                >
                  No case studies yet. Add your first one!
                </div>
              )}
              
            {/* Case Studies List */}
            <FlexCol style={{ gap: '8px', width: '100%', marginTop: '8px' }}>
              {loading ? (
                // Show skeleton placeholders while loading
                [...Array(skeletonCount)].map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              ) : (
                caseStudies.map((study) => (
                  <CaseStudyCard 
                    key={study.id} 
                    study={study} 
                    onDelete={deleteCaseStudy} 
                  />
                ))
              )}
            </FlexCol>
          </FlexCol>
          
          <MacScrollbar height="600px" />
        </FlexRow>

        {/* Bottom status bar */}
        <div style={{
          backgroundColor: '#fff',
          borderTop: '1px solid #000',
          padding: '4px 8px',
          width: '100%',
          fontSize: '10px',
          fontFamily: 'Chicago, Monaco, monospace',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>{caseStudies.length} items</span>
          <span>1549K available</span>
        </div>
      </FlexCol>
      
      {/* Add New Case Study Modal */}
      {dialogOpen && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#e8e8e8',
              border: '2px solid #000',
              boxShadow: '4px 4px 0px #000',
              width: '90%',
              maxWidth: '500px',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <MacTitleBar title="New Case Study" />
            <div style={{ padding: '8px' }}>
              <CaseStudyForm 
                initialValues={newCaseStudy}
                onSubmit={handleAddCaseStudy} 
                onCancel={() => setDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </FlexCol>
  )
}

export default PortfolioPage
