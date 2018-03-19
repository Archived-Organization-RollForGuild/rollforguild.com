export default function pushTrackableEventToDataLayer (eventData) {
  const dataLayer = window.dataLayer || (window.dataLayer = [])

  dataLayer.push({
    event: 'trackable',
    ...eventData,
  })
}
