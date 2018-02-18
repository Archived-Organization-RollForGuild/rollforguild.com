if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => {
      console.log('Service worker registered')
    })
    .catch(error => {
      console.error('Error during worker registration: ', error)
    })
}
