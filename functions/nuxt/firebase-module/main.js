import firebase from 'firebase/app'

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- END: Import Scripts ---------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

export default async ({ res }, inject) => {
  const options = {"config":{"apiKey":"AIzaSyC5Yz_XKNs9nnYQcKIIAMRWj26cBUS10LQ","authDomain":"nuxt-firebase-ssr-auth.firebaseapp.com","databaseURL":"https:\u002F\u002Fnuxt-firebase-ssr-auth.firebaseio.com","projectId":"nuxt-firebase-ssr-auth","storageBucket":"nuxt-firebase-ssr-auth.appspot.com","messagingSenderId":"339794081337","appId":"1:339794081337:web:d10b4270d3bd7e45be3fe8"},"services":{"auth":{"initialize":{"onAuthStateChangedAction":"onAuthStateChanged"},"ssr":true}}}
  const firebaseConfig = options.config

  // Resolve the firebase app corresponding to the server user
  let session
  if (process.server && res && res.locals && res.locals.user) {
    session = firebase.apps.find(a => a.name === res.locals.user.uid) || firebase.initializeApp({
      ...firebaseConfig,
      _created: Date.now()
    }, res.locals.user.uid)
    res.locals._session = session
  } else {
    session = firebase.apps.find(a => a.name === '[DEFAULT]') || firebase.initializeApp(firebaseConfig)
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

    await import('firebase/auth')

    const fireAuth = session.auth()
    const fireAuthObj = firebase.auth
    inject('fireAuth', fireAuth)
    inject('fireAuthObj', fireAuthObj)

    if (process.client && options.services.auth.persistence) {
      const persistence = options.services.auth.persistence

      try {
        await fireAuth.setPersistence(persistence)
      } catch (err) {
        if (err.code === 'auth/invalid-persistence-type') {
          console.warn(`[@nuxtjs/firebase]: Invalid persistence type '${persistence}' provided`)
        } else if (err.code === 'auth/unsupported-persistence-type') {
          console.warn(`[@nuxtjs/firebase]: Persistence type '${persistence}' is not supported in this environment.`)
        }
      }
    }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FIRESTORE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------------ FIREBASE STORAGE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FUNCTIONS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE MESSAGING --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Performance can only be initiated on client side

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE ANALYTICS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Analytics can only be initiated on the client side

  /** --------------------------------------------------------------------------------------------- **/
  /** --------------------------------- FIREBASE REMOTE CONFIG DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/
}
