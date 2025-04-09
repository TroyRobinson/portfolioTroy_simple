import React from 'react'
import { FlexCol, FlexRow } from '../components/primitives/FlexLayout.jsx'
import { Header } from '../components/Header.jsx'

// Classic Mac-style title bar component
const MacTitleBar = ({ title }) => (
  <>
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
  </>
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

const AboutPage = ({ style = {} }) => {
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
      <Header
        title='About'
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
        <MacTitleBar title="About This Website" />
        
        <FlexRow style={{ width: '100%' }}>
          <FlexCol
            style={{
              padding: '16px',
              width: '100%',
              maxHeight: '600px',
              overflow: 'auto',
            }}
          >
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid #000',
              padding: '16px',
              marginBottom: '16px',
            }}>
              <FlexRow style={{ gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#e8e8e8',
                  border: '1px solid #000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                }}>
                  TR
                </div>
                <FlexCol>
                  <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                    Troy Robinson
                  </h2>
                  <p style={{ fontSize: '12px' }}>
                    Developer & Designer
                  </p>
                </FlexCol>
              </FlexRow>
              
              <p style={{ fontSize: '12px', marginBottom: '8px', lineHeight: '1.4' }}>
                Welcome to my portfolio website with a classic Macintosh UI design. This site showcases my work and skills using a nostalgic interface inspired by early computing.
              </p>
              
              <p style={{ fontSize: '12px', marginBottom: '8px', lineHeight: '1.4' }}>
                The design pays homage to the groundbreaking Macintosh operating system from the 1980s, which revolutionized how people interact with computers through its intuitive graphical user interface.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '1px solid #000',
              padding: '16px',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                Technologies Used
              </h3>
              
              <ul style={{ 
                fontSize: '12px', 
                paddingLeft: '16px', 
                lineHeight: '1.4',
                listStyleType: 'square',
              }}>
                <li>React for the user interface</li>
                <li>Wouter for navigation</li>
                <li>InstantDB for data storage</li>
                <li>Vite for building and development</li>
                <li>CSS-in-JS for styling</li>
              </ul>
              
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '16px 0 8px 0' }}>
                Classic Mac UI Elements
              </h3>
              
              <p style={{ fontSize: '12px', marginBottom: '8px', lineHeight: '1.4' }}>
                This interface includes many classic Mac OS elements:
              </p>
              
              <ul style={{ 
                fontSize: '12px', 
                paddingLeft: '16px', 
                lineHeight: '1.4',
                listStyleType: 'square',
              }}>
                <li>Menu bar with File, Edit, View, and Special menus</li>
                <li>Window title bars with close buttons</li>
                <li>Chicago font (or monospace fallback)</li>
                <li>Classic scrollbars with arrows</li>
                <li>Black and white high-contrast interface</li>
                <li>Square buttons and input fields</li>
              </ul>
            </div>
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
          <span>2 items</span>
          <span>1549K available</span>
        </div>
      </FlexCol>
    </FlexCol>
  )
}

export default AboutPage 