/**
 * INFOBOX
 *
 * Listen to user actions and display a contextualized box with Mediapart links
 */

// TODO: performs a DOM scan to detect keywords in page content
// TODO: sends a message to Indexer to get any links
// TODO: handle message from indexer to display a Mediaparty links in page
// TODO: display a popup on hover that contains Mediapart links sent by indexer

import { ACTIONS } from './config/constants.json'

const handleMessage = (request, sender, sendResponse) => {
  switch (request.action) {
    case ACTIONS.SCAN:
      console.debug('perform a scan of DOM content')
  }
}

browser.runtime.onMessage.addListener(handleMessage)
