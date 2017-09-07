/**
 * src/actions.js specs file
 *
 */

'use strict'

const expect = chai.expect

const { getCurrentTabId }  = require('actions')

describe('Actions', () => {

  describe('Tabs management', () => {

    // FIXME: browser.tabs.query is undefined
    it.skip('returns the current tab ID', () => {
      const tabId = getCurrentTabId()
      expect(tabId).to.be.fulfilled
      expect(browser.tabs.query).have.been.calledOnce
      expect(browser.tabs.query).have.been.calledWith({
        active: true,
        currentWindow: true
      })
    })

  })

})
