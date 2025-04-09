import React from 'react'
import { FlexCol, FlexRow } from '../utils.jsx'
import { Tag } from '../components/primitives/Tag.jsx'
import { Header } from '../components/Header.jsx'
import { Link } from '../Router.jsx'

// Pre-import InstantDB to reduce initial loading time
const instantdbImport = import(
  'https://esm.sh/@instantdb/core@0.17.31'
)

// Simple spinner component
const Spinner = () => (
  <div
    style={{
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      borderTopColor: '#333',
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '8px',
      verticalAlign: 'middle',
    }}
  >
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

// Sample case studies data
const SAMPLE_CASE_STUDIES = [
  {
    name: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce platform with product catalog, shopping cart, and payment processing. Implemented responsive design and user authentication.',
    technologies:
      'React, Node.js, Express, MongoDB, Stripe',
    date: '2023-06-15',
    createdAt: new Date('2023-06-15').getTime(),
  },
  {
    name: 'Health Tracking Mobile App',
    description:
      'A cross-platform mobile application for tracking health metrics, workouts, and nutrition. Features include data visualization and progress tracking.',
    technologies: 'React Native, Firebase, Redux, Chart.js',
    date: '2023-02-22',
    createdAt: new Date('2023-02-22').getTime(),
  },
  {
    name: 'Enterprise CRM System',
    description:
      'Custom CRM system for enterprise client with lead management, customer tracking, and sales pipeline visualization.',
    technologies:
      'Angular, TypeScript, C#, .NET Core, SQL Server',
    date: '2022-11-10',
    createdAt: new Date('2022-11-10').getTime(),
  },
  {
    name: 'AI-Powered Content Generator',
    description:
      "Web application that generates marketing content using OpenAI's GPT API. Features include prompt management and output customization.",
    technologies:
      'Next.js, OpenAI API, Tailwind CSS, Vercel',
    date: '2023-09-05',
    createdAt: new Date('2023-09-05').getTime(),
  },
  {
    name: 'Real-time Collaboration Tool',
    description:
      'A document collaboration tool with real-time editing, commenting, and version history. Implemented WebSocket connections for live updates.',
    technologies: 'Vue.js, Socket.io, Express, PostgreSQL',
    date: '2022-07-30',
    createdAt: new Date('2022-07-30').getTime(),
  },
]

// Generate a unique ID with optional prefix
const generateUniqueId = (prefix = '') => {
  return `${prefix}${Math.random()
    .toString(36)
    .substring(2, 10)}-${Date.now().toString(36)}`
}

const PortfolioPage = ({ style }) => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [caseStudies, setCaseStudies] = React.useState([])
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [db, setDb] = React.useState(null)
  const [dummyDataLoaded, setDummyDataLoaded] =
    React.useState(false)
  const [isClearing, setIsClearing] = React.useState(false)
  const [status, setStatus] = React.useState('')
  const [appId, setAppId] = React.useState(
    '4a592307-cbd2-44e0-8818-d863e9e95399',
  )
  const [instantModule, setInstantModule] =
    React.useState(null)

  // Form state
  const [newCaseStudy, setNewCaseStudy] = React.useState({
    name: '',
    description: '',
    technologies: '',
    date: '',
  })

  // Initialize InstantDB on first load
  React.useEffect(() => {
    const initializeDb = async () => {
      try {
        // Use the pre-imported module
        const module = await instantdbImport
        setInstantModule(module)

        const { init, i, id } = module

        // Schema definition
        const schema = i.schema({
          entities: {
            caseStudies: i.entity({
              name: i.string(),
              description: i.string(),
              technologies: i.string(),
              date: i.string(),
              createdAt: i.date(),
            }),
          },
        })

        console.log(
          'Initializing InstantDB with appId:',
          appId,
        )
        const database = init({
          appId,
          schema,
          persistence: true,
          batchingInterval: 50,
        })

        setDb({ database, id })

        // Subscribe to case studies data
        database.subscribeQuery(
          { caseStudies: {} },
          (resp) => {
            if (resp.error) {
              console.error(
                'Subscription error:',
                resp.error,
              )
              setError(resp.error.message)
              setLoading(false)
              return
            }

            if (resp.data) {
              setCaseStudies(resp.data.caseStudies || [])
              setLoading(false)
            }
          },
        )
      } catch (err) {
        setError(
          'Error initializing the application: ' +
            err.message,
        )
        setLoading(false)
        console.error('Full error:', err)
      }
    }

    initializeDb()
  }, [appId])

  // Add sample case studies to the database
  const addSampleData = React.useCallback(async () => {
    if (!db || !instantModule) return false

    try {
      setIsClearing(true)
      setStatus('Adding sample case studies...')

      // Create a single transaction for all sample data
      const { id } = instantModule
      const transactions = SAMPLE_CASE_STUDIES.map(
        (study, index) => {
          const studyId = `sample-${index}`
          return db.database.tx.caseStudies[studyId].update(
            {
              name: study.name,
              description: study.description,
              technologies: study.technologies,
              date: study.date,
              createdAt: study.createdAt,
            },
          )
        },
      )

      await db.database.transact(...transactions)

      setStatus('Sample data added successfully!')
      setDummyDataLoaded(true)

      setTimeout(() => setStatus(''), 3000)
      return true
    } catch (err) {
      console.error('Error adding sample data:', err)
      setError('Error adding sample data: ' + err.message)
      setStatus('Error adding sample data')
      setTimeout(() => setStatus(''), 3000)
      return false
    } finally {
      setIsClearing(false)
    }
  }, [db, instantModule])

  // Delete all data from the database
  const deleteAllData = React.useCallback(
    async (loadSampleDataAfter = false) => {
      if (!db) return

      try {
        setIsClearing(true)
        setError(null)
        setStatus('Starting database cleanup...')

        // Get all case studies
        const refreshData = () => {
          return new Promise((resolve) => {
            db.database.subscribeQuery(
              { caseStudies: {} },
              (resp) => {
                if (resp.data) {
                  resolve(resp.data.caseStudies || [])
                } else {
                  resolve([])
                }
              },
            )
          })
        }

        const remaining = await refreshData()

        if (remaining.length > 0) {
          // Batch delete all studies at once
          const deleteTransactions = remaining.map(
            (study) =>
              db.database.tx.caseStudies[study.id].delete(),
          )

          await db.database.transact(...deleteTransactions)
        }

        // Check if any remain
        const checkRemaining = await refreshData()
        if (checkRemaining.length === 0) {
          setDummyDataLoaded(false)
          setCaseStudies([])

          if (loadSampleDataAfter) {
            setStatus(
              'Deletion complete. Adding sample data...',
            )
            await addSampleData()
          } else {
            setStatus('Database cleared successfully!')
          }
        } else {
          setError(
            'Failed to delete all case studies. Try the reset button instead.',
          )
          setStatus(
            'Deletion failed. Some records could not be deleted.',
          )
        }
      } catch (err) {
        console.error('Error in delete operation:', err)
        setError('Error deleting data: ' + err.message)
        setStatus('Error occurred during deletion process.')
      } finally {
        setIsClearing(false)
        setTimeout(() => setStatus(''), 3000)
      }
    },
    [db, addSampleData],
  )

  // Completely reset the database with a new instance
  const resetDatabase = React.useCallback(async () => {
    if (!instantModule) return

    try {
      setIsClearing(true)
      setError(null)
      setStatus('🔄 Creating fresh database instance...')

      // Reset all state
      setDb(null)
      setCaseStudies([])
      setDummyDataLoaded(false)
      setLoading(true)

      // Clear local storage
      localStorage.clear()

      // Generate a new app ID for a fresh database
      const newAppId = generateUniqueId('portfolio-')
      setAppId(newAppId)

      // Initialize new database with the fresh app ID
      const { init, i, id } = instantModule

      const schema = i.schema({
        entities: {
          caseStudies: i.entity({
            name: i.string(),
            description: i.string(),
            technologies: i.string(),
            date: i.string(),
            createdAt: i.date(),
          }),
        },
      })

      const database = init({
        appId: newAppId,
        schema,
      })

      setDb({ database, id })

      // Subscribe to data
      database.subscribeQuery(
        { caseStudies: {} },
        (resp) => {
          if (resp.error) {
            console.error('Subscription error:', resp.error)
            setError(resp.error.message)
            setLoading(false)
            return
          }

          if (resp.data) {
            const receivedCaseStudies =
              resp.data.caseStudies || []
            setCaseStudies(receivedCaseStudies)
            setLoading(false)

            // Add sample data if database is empty
            if (
              receivedCaseStudies.length === 0 &&
              !dummyDataLoaded
            ) {
              const addSampleDataBatch = async () => {
                const transactions =
                  SAMPLE_CASE_STUDIES.map(
                    (study, index) => {
                      const studyId = `sample-${index}`
                      return database.tx.caseStudies[
                        studyId
                      ].update({
                        name: study.name,
                        description: study.description,
                        technologies: study.technologies,
                        date: study.date,
                        createdAt: study.createdAt,
                      })
                    },
                  )

                try {
                  await database.transact(...transactions)
                  setDummyDataLoaded(true)
                } catch (err) {
                  console.error(
                    'Error adding sample data in batch:',
                    err,
                  )
                }
              }

              setTimeout(addSampleDataBatch, 100)
            }
          }
        },
      )
    } catch (err) {
      console.error('Error resetting database:', err)
      setError('Error resetting database: ' + err.message)
      setStatus('Error resetting database.')
      setLoading(false)
    } finally {
      setIsClearing(false)
      setTimeout(() => setStatus(''), 3000)
    }
  }, [dummyDataLoaded, instantModule])

  // Case study CRUD operations
  const addCaseStudy = () => {
    if (!db) return

    db.database.transact(
      db.database.tx.caseStudies[db.id()].update({
        name: newCaseStudy.name,
        description: newCaseStudy.description,
        technologies: newCaseStudy.technologies,
        date: newCaseStudy.date,
        createdAt: Date.now(),
      }),
    )

    // Reset form and close dialog
    setNewCaseStudy({
      name: '',
      description: '',
      technologies: '',
      date: '',
    })
    setDialogOpen(false)
  }

  const deleteCaseStudy = (caseStudy) => {
    if (!db) return
    db.database.transact(
      db.database.tx.caseStudies[caseStudy.id].delete(),
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCaseStudy((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newCaseStudy.name && newCaseStudy.technologies) {
      addCaseStudy()
    }
  }

  // Sort case studies by creation date (oldest first)
  const sortedCaseStudies = [...caseStudies].sort(
    (a, b) => {
      const timeA =
        a.createdAt ||
        (a.date ? new Date(a.date).getTime() : 0)
      const timeB =
        b.createdAt ||
        (b.date ? new Date(b.date).getTime() : 0)
      return timeA - timeB
    },
  )

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
            {status && (
              <div
                style={{
                  fontSize: '0.9rem',
                  color: '#4a5568',
                  backgroundColor: '#edf2f7',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  marginTop: '5px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {isClearing && <Spinner />}
                <span>{status}</span>
              </div>
            )}
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
        {error && (
          <div
            style={{
              color: 'red',
              backgroundColor: '#ffeeee',
              padding: '10px',
              border: '1px solid #ffcccc',
              borderRadius: '4px',
              marginBottom: '15px',
            }}
          >
            Error: {error}
          </div>
        )}
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
                      value={newCaseStudy.name}
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
                      value={newCaseStudy.description}
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
                      value={newCaseStudy.technologies}
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
                      value={newCaseStudy.date}
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
                      onClick={() => setDialogOpen(false)}
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
            </div>
          </div>
        )}
        {!loading &&
          !error &&
          sortedCaseStudies.length === 0 && (
            <div
              style={{ padding: '20px 0', color: '#666' }}
            >
              No case studies yet. Add your first one!
            </div>
          )}
        {/* Case Studies List */}
        <FlexCol style={{ gap: '15px', width: '100%' }}>
          {sortedCaseStudies.map((study) => (
            <div
              key={study.id}
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
                minWidth: '550px',
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
                  onClick={() => deleteCaseStudy(study)}
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
          ))}
        </FlexCol>
      </FlexCol>
    </FlexCol>
  )
}

export default PortfolioPage
