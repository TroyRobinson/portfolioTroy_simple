/**
 * Database service for handling InstantDB operations
 */

// @ts-ignore - ESM module import
// Pre-import InstantDB to reduce initial loading time
const instantdbImport = import(
  'https://esm.sh/@instantdb/core@0.17.31'
)

// Add client-side caching
const studyCache = {
  data: null,
  timestamp: 0
}

let globalDbInstance = null;

/**
 * Explicitly preload the InstantDB module
 * Call this as early as possible in the application
 * @returns {Promise<void>}
 */
export const preloadInstantDbModule = async () => {
  try {
    await instantdbImport;
    console.log('InstantDB module preloaded successfully');
    
    // Start initializing the database immediately
    const appId = localStorage.getItem('portfolioAppId') || '4a592307-cbd2-44e0-8818-d863e9e95399';
    const db = await initDatabase(appId, (resp) => {
      // Just store the data in cache when it arrives
      if (resp.data) {
        studyCache.data = resp.data.caseStudies || [];
        studyCache.timestamp = Date.now();
      }
    });
    
    globalDbInstance = db;
  } catch (err) {
    console.error('Failed to preload InstantDB module:', err);
  }
}

/**
 * Initialize the InstantDB database
 * @param {string} appId - The application ID for InstantDB
 * @param {Function} onSubscriptionData - Callback for subscription data updates
 * @returns {Promise<Object>} The database instance and ID function
 */
export const initDatabase = async (appId, onSubscriptionData) => {
  try {
    // Return existing instance if already initialized with same appId
    if (globalDbInstance && globalDbInstance.appId === appId) {
      // Re-subscribe with the new callback if provided
      if (onSubscriptionData) {
        globalDbInstance.database.subscribeQuery(
          { caseStudies: {} },
          (resp) => {
            // Update cache when new data arrives
            if (resp.data) {
              studyCache.data = resp.data.caseStudies || [];
              studyCache.timestamp = Date.now();
            }
            onSubscriptionData(resp);
          }
        );
      }
      return globalDbInstance;
    }
    
    // Use the pre-imported module
    const module = await instantdbImport
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
      appId
    )
    
    const database = init({
      appId,
      schema,
      persistence: true,
      batchingInterval: 50,
      synchronous: true, // Improve initial loading time
    })

    // Subscribe to case studies data
    if (onSubscriptionData) {
      database.subscribeQuery(
        { caseStudies: {} },
        (resp) => {
          // Update cache when new data arrives
          if (resp.data) {
            studyCache.data = resp.data.caseStudies || [];
            studyCache.timestamp = Date.now();
          }
          onSubscriptionData(resp);
        }
      )
    }

    const dbInstance = { database, id, appId };
    
    // Store globally for reuse
    globalDbInstance = dbInstance;
    
    return dbInstance;
  } catch (err) {
    console.error('Error initializing the database:', err)
    throw err
  }
}

/**
 * Add a case study to the database
 * @param {Object} db - The database instance
 * @param {Object} caseStudy - The case study data to add
 * @param {string} id - Optional ID for the case study (generated if not provided)
 * @returns {Promise<void>}
 */
export const addCaseStudy = async (db, caseStudy, id = null) => {
  if (!db) return

  const studyId = id || db.id()
  await db.database.transact(
    db.database.tx.caseStudies[studyId].update({
      ...caseStudy,
      createdAt: caseStudy.createdAt || Date.now(),
    })
  )
}

/**
 * Delete a case study from the database
 * @param {Object} db - The database instance
 * @param {Object} caseStudy - The case study to delete
 * @returns {Promise<void>}
 */
export const deleteCaseStudy = async (db, caseStudy) => {
  if (!db) return
  await db.database.transact(
    db.database.tx.caseStudies[caseStudy.id].delete()
  )
}

/**
 * Delete all case studies from the database
 * @param {Object} db - The database instance
 * @param {Array} caseStudies - The case studies to delete
 * @returns {Promise<void>}
 */
export const deleteAllCaseStudies = async (db, caseStudies) => {
  if (!db || caseStudies.length === 0) return

  const deleteTransactions = caseStudies.map(
    (study) => db.database.tx.caseStudies[study.id].delete()
  )

  await db.database.transact(...deleteTransactions)
}

/**
 * Get the current list of case studies
 * @param {Object} db - The database instance
 * @returns {Promise<Array>} The list of case studies
 */
export const getCaseStudies = (db) => {
  return new Promise((resolve) => {
    // Check if we have cached data less than 30 seconds old
    if (studyCache.data && (Date.now() - studyCache.timestamp < 30000)) {
      resolve(studyCache.data);
      return;
    }
    
    if (!db) {
      // Try to use the global instance if available
      if (!globalDbInstance) {
        resolve([]);
        return;
      }
      db = globalDbInstance;
    }
    
    db.database.subscribeQuery(
      { caseStudies: {} },
      (resp) => {
        if (resp.data) {
          // Update cache
          studyCache.data = resp.data.caseStudies || [];
          studyCache.timestamp = Date.now();
          resolve(resp.data.caseStudies || []);
        } else {
          resolve([]);
        }
      }
    )
  })
} 