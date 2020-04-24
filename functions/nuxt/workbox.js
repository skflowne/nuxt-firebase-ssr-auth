async function register() {
  console.info('register workbox')
  if (!'serviceWorker' in navigator) {
    throw new Error('serviceWorker is not supported in current browser!')
  }

  console.info('importing workbox')
  const { Workbox } = await import('workbox-cdn/workbox/workbox-window.dev.es5.mjs')
  console.info('workbox imported, new')

  const workbox = new Workbox('/sw.js', {
    scope: '/'
  })

  console.info('awaiting register workbox')
  await workbox.register()
  console.info('registered workbox')

  return workbox
}

window.$workbox = register()
  .catch(error => { console.error('Error registering workbox:', error) })
