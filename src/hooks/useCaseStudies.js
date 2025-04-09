import { useState, useEffect, useCallback, useMemo } from 'react'
import { generateUniqueId } from '../utils/helpers'
import * as dbService from '../services/database'

// @ts-ignore - ESM module import
// Pre-fetch the module to speed up initial load
const instantModulePromise = import('https://esm.sh/@instantdb/core@0.17.31')

/**
 * Custom hook for managing case studies with InstantDB
 * @param {string} initialAppId - Initial App ID for InstantDB
 * @returns {Object} Case studies state and functions
 */
export const useCaseStudies = (initialAppId = '') => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [caseStudies, setCaseStudies] = useState([])
  const [isClearing, setIsClearing] = useState(false)
  const [status, setStatus] = useState('')
  const [appId, setAppId] = useState(
    initialAppId || localStorage.getItem('portfolioAppId') || '4a592307-cbd2-44e0-8818-d863e9e95399'
  )
  const [db, setDb] = useState(null)
  const [instantModule, setInstantModule] = useState(null)

  // Initialize InstantDB on first load
  useEffect(() => {
    const initializeDb = async () => {
      try {
        // First try to get data from cache to immediately render
        const cachedStudies = await dbService.getCaseStudies(null); // null will use global instance
        if (cachedStudies.length > 0) {
          setCaseStudies(cachedStudies);
          setLoading(false);
        }
        
        // Store app ID in localStorage to prevent regeneration on refresh
        if (!localStorage.getItem('portfolioAppId')) {
          localStorage.setItem('portfolioAppId', appId);
        }

        const handleSubscription = (resp) => {
          if (resp.error) {
            console.error('Subscription error:', resp.error)
            setError(resp.error.message)
            setLoading(false)
            return
          }

          if (resp.data) {
            setCaseStudies(resp.data.caseStudies || [])
            setLoading(false)
          }
        }

        // Initialize the database
        const database = await dbService.initDatabase(
          appId,
          handleSubscription
        )
        
        // Store the module and database
        setDb(database)
        setInstantModule(await instantModulePromise)
      } catch (err) {
        setError(
          'Error initializing the application: ' +
            err.message
        )
        setLoading(false)
        console.error('Full error:', err)
      }
    }

    initializeDb()
  }, [appId])

  // Delete all data from the database
  const deleteAllData = useCallback(
    async () => {
      if (!db) return

      try {
        setIsClearing(true)
        setError(null)
        setStatus('Starting database cleanup...')

        // Get current case studies
        const currentStudies = await dbService.getCaseStudies(db)
        
        // Delete all case studies
        if (currentStudies.length > 0) {
          await dbService.deleteAllCaseStudies(db, currentStudies)
        }

        // Check if any remain
        const remaining = await dbService.getCaseStudies(db)
        
        if (remaining.length === 0) {
          setCaseStudies([])
          setStatus('Database cleared successfully!')
        } else {
          setError(
            'Failed to delete all case studies. Try the reset button instead.'
          )
          setStatus(
            'Deletion failed. Some records could not be deleted.'
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
    [db]
  )

  // Completely reset the database with a new instance
  const resetDatabase = useCallback(async () => {
    if (!instantModule) return

    try {
      setIsClearing(true)
      setError(null)
      setStatus('🔄 Creating fresh database instance...')

      // Reset all state
      setDb(null)
      setCaseStudies([])
      setLoading(true)

      // Clear local storage
      localStorage.clear()

      // Generate a new app ID for a fresh database
      const newAppId = generateUniqueId('portfolio-')
      setAppId(newAppId)
    } catch (err) {
      console.error('Error resetting database:', err)
      setError('Error resetting database: ' + err.message)
      setStatus('Error resetting database.')
      setLoading(false)
    } finally {
      setIsClearing(false)
      setTimeout(() => setStatus(''), 3000)
    }
  }, [instantModule])

  // Add a case study
  const addCaseStudy = useCallback(async (caseStudy) => {
    if (!db) return
    
    try {
      await dbService.addCaseStudy(db, {
        ...caseStudy,
        createdAt: Date.now(),
      })
      return true
    } catch (err) {
      console.error('Error adding case study:', err)
      setError('Error adding case study: ' + err.message)
      return false
    }
  }, [db])

  // Delete a case study
  const deleteCaseStudy = useCallback(async (caseStudy) => {
    if (!db) return
    
    try {
      await dbService.deleteCaseStudy(db, caseStudy)
      return true
    } catch (err) {
      console.error('Error deleting case study:', err)
      setError('Error deleting case study: ' + err.message)
      return false
    }
  }, [db])

  // Sort case studies by creation date (oldest first)
  // Using useMemo to prevent re-sorting on every render
  const sortedCaseStudies = useMemo(() => 
    [...caseStudies].sort(
      (a, b) => {
        const timeA =
          a.createdAt ||
          (a.date ? new Date(a.date).getTime() : 0)
        const timeB =
          b.createdAt ||
          (b.date ? new Date(b.date).getTime() : 0)
        return timeA - timeB
      }
    ), [caseStudies]
  )

  return {
    loading,
    error,
    status,
    isClearing,
    caseStudies: sortedCaseStudies,
    addCaseStudy,
    deleteCaseStudy,
    deleteAllData,
    resetDatabase,
    db,
    appId,
  }
} 