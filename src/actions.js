/**
 * ACTIONS
 *
 * Listen to user interactions and glu infobox to the indexer
 *
 */

'use strict'

import { ACTIONS } from './config/constants.json'

// Display the Mediaparty action URL button for the given tab
export const enableAction = id => {
  browser.pageAction.show(id)
}

// Returns the current visble tab ID
export const getCurrentTabId = () => {
  return browser.tabs
    .query({active: true, currentWindow: true})
    .then(tabs => tabs[0].id)
}

// Attach events to user actions
export const bindEvents = () => {
  // Trigger a scan when user click on the Mediaparty button
  browser.pageAction.onClicked.addListener(tab => {
    getCurrentTabId()
    .then(id => browser.tabs.sendMessage(id, {action: ACTIONS.SCAN}))
  })
}

/**
 * Main entrypoint
 */
export const init = () => {
  bindEvents()

  // Enable the Mediaparty button when switching tab
  browser.tabs
    .onActivated.addListener(active => enableAction(active.tabId))
  getCurrentTabId()
    .then(id => enableAction(id))
}
