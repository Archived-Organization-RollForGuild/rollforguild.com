// These are helpers to help setup various environments for tests. Note that the _ at the start of the filename denotes it should be ignored by Jest.

/**
 * Adds dialog container to the global jest document
 * Required for any component which would cause an dialog to be mounted.
 *
 * @returns {void}
 */
export const setupDialogContainer = () => {
  const dialogContainer = global.document.createElement('div')
  dialogContainer.setAttribute('id', 'dialog-container')

  const body = global.document.querySelector('body')
  body.appendChild(dialogContainer)
}


/**
 * Adds alert container to the global jest document.
 * Required for any component which would cause an alert to be mounted.
 *
 * @returns {void}
 */
export const setupAlertContainer = () => {
  const alertContainer = global.document.createElement('div')
  alertContainer.setAttribute('id', 'alert-container')

  const body = global.document.querySelector('body')
  body.appendChild(alertContainer)
}
