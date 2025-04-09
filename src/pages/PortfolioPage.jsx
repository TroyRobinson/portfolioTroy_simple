import React, { useState, useEffect } from 'react'
import { FlexCol, FlexRow } from '../utils.jsx'
import { Header } from '../components/Header.jsx'
import Spinner from '../components/Spinner.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import CaseStudyForm from '../components/CaseStudyForm.jsx'
import { useCaseStudies } from '../hooks/useCaseStudies.js'

// Skeleton component for loading state
const SkeletonCard = () => (
  <div style={{
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '20px',
    width: '100%',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    animation: 'pulse 1.5s infinite',
  }}>
    <div style={{ 
      height: '24px', 
      width: '40%', 
      backgroundColor: '#e0e0e0', 
      marginBottom: '12px',
      borderRadius: '4px',
    }} />
    <div style={{ 
      height: '80px', 
      width: '100%', 
      backgroundColor: '#e0e0e0',
      marginBottom: '12px',
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

const PortfolioPage = ({ style }) => {
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
        margin: '0 auto',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        alignItems: 'flex-start',
        ...style,
      }}
    >
      <Header
        title='Case Studies'
        style={{ width: '100%' }}
      />
      <FlexCol
        style={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <FlexRow
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 0 20px 0',
            width: '100%',
          }}
        >
          <FlexCol style={{ gap: '5px' }}>
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
          <button
            onClick={() => setDialogOpen(true)}
            disabled={isClearing || loading}
            style={{
              backgroundColor: '#2b6cb0',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '4px',
              border: 'none',
              cursor:
                isClearing || loading
                  ? 'not-allowed'
                  : 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              opacity: isClearing || loading ? 0.7 : 1,
            }}
          >
            Add New Case Study
          </button>
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
                borderRadius: '6px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
                width: '90%',
                maxWidth: '500px',
                padding: '20px',
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  padding: '0 0 20px 0',
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
              style={{ padding: '20px 0', color: '#666' }}
            >
              No case studies yet. Add your first one!
            </div>
          )}
          
        {/* Case Studies List */}
        <FlexCol style={{ gap: '15px', width: '100%' }}>
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
      
      {/* Add CSS for skeleton animation */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </FlexCol>
  )
}

export default PortfolioPage
