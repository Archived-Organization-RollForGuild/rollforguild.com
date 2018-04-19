export default function activateZenDesk () {
  if (window.zE) {
    window.zE(() => {
      window.zE.activate()
    })
  }
}
