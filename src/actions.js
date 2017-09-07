/**
 * ACTIONS
 *
 * Listen to user interactions and glu infobox to the indexer
 *
 */

'use strict'

import { ACTIONS } from './config/constants.json'

export const enableAction = id => {
  browser.pageAction.show(id)
}

export const getCurrentTabId = () => {
  return browser.tabs
    .query({active: true, currentWindow: true})
    .then(tabs => tabs[0].id)
}

browser.pageAction.onClicked.addListener(tab => {
  getCurrentTabId()
    .then(id => browser.tabs.sendMessage(id, {action: ACTIONS.SCAN}))
})


browser.runtime.onStartup.addListener(() => {
  browser.tabs
    .onActivated.addListener(active => enableAction(active.tabId))
  getCurrentTabId()
    .then(id => enableAction(id))
  })
