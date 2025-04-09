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
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '16px',
    width: '100%',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    animation: 'pulse 1.5s infinite',
  }}>
    <div style={{ 
      height: '24px', 
      width: '40%', 
      backgroundColor: '#e0e0e0', 
      marginBottom: '8px',
      borderRadius: '4px',
    }} />
    <div style={{ 
      height: '80px', 
      width: '100%', 
      backgroundColor: '#e0e0e0',
      marginBottom: '8px',
      borderRadius: '4px',
    }} />
    <div style={{ 
      height: '20px', 
      width: '60%', 
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
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
        minHeight: '100vh',
        padding: '16px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        alignItems: 'flex-start',
        ...style,
      }}
    >
      <PulseAnimation />
      <Header
        title='Case Studies'
        style={{ width: '100%' }}
      />
      <FlexCol
        style={{
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '100%',
        }}
      >
        <FlexRow
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 0 16px 0',
            width: '100%',
          }}
        >
          <FlexCol style={{ gap: '8px' }}>
            <div
              style={{ fontSize: '0.9rem', color: '#666' }}
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
            }}
          >
            Add New Case Study
          </Button>
        </FlexRow>
        
        {/* Add New Case Study Modal */}
        {dialogOpen && (
          <div
            style={{
              position: 'fixed',
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
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                width: '90%',
                maxWidth: '500px',
                padding: '16px',
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  padding: '0 0 16px 0',
                }}
              >
                New Case Study
              </h3>
              <CaseStudyForm 
                initialValues={newCaseStudy}
                onSubmit={handleAddCaseStudy} 
                onCancel={() => setDialogOpen(false)}
              />
            </div>
          </div>
        )}
        
        {!loading &&
          !error &&
          caseStudies.length === 0 && (
            <div
              style={{ padding: '16px 0', color: '#666' }}
            >
              No case studies yet. Add your first one!
            </div>
          )}
          
        {/* Case Studies List */}
        <FlexCol style={{ gap: '16px', width: '100%' }}>
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
    </FlexCol>
  )
}

export default PortfolioPage
