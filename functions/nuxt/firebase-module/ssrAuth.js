import admin from 'firebase-admin'

const options = {"credential":false,"config":{"apiKey":"AIzaSyC5Yz_XKNs9nnYQcKIIAMRWj26cBUS10LQ","authDomain":"nuxt-firebase-ssr-auth.firebaseapp.com","databaseURL":"https:\u002F\u002Fnuxt-firebase-ssr-auth.firebaseio.com","projectId":"nuxt-firebase-ssr-auth","storageBucket":"nuxt-firebase-ssr-auth.appspot.com","messagingSenderId":"339794081337","appId":"1:339794081337:web:d10b4270d3bd7e45be3fe8"}}

const simulateUserRecord = ({
  uid,
  email,
  email_verified: emailVerified,
  name: displayName
}) => ({
  uid,
  email,
  emailVerified,
  displayName
})

if (!admin.apps.length) {
  if (options.credential) {
    const credential =
      typeof options.credential === 'boolean'
        ? admin.credential.applicationDefault()
        : admin.credential.cert(options.credential)

    admin.initializeApp({
      credential,
      ...options.config
    })
  } else {
    admin.initializeApp(options.config)
  }
}

export default async ({ req, res }) => {
  if (!req.headers.authorization) {
    return
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || ''
  const components = authorizationHeader.split(' ')
  const idToken = components.length > 1 ? components[1] : ''

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    if (decodedToken.uid) {
      const authUser = options.credential
        ? await admin.auth().getUser(decodedToken.uid)
        : simulateUserRecord(decodedToken)

      res.locals = {
        ...res.locals,
        user: {
          ...authUser,
          allClaims: decodedToken
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}
