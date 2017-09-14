/**
 * INFOBOX
 *
 * Listen to user actions and display a contextualized box with Mediapart links
 */

// TODO: display a Mediaparty links in page
// TODO: display a popup on hover that contains Mediapart links sent by indexer

import { ACTIONS } from './config/constants.json'

const scanner = /\s(\w?[A-Z]\w+)/gm

const handleMessage = (request, sender, sendResponse) => {
  switch (request.action) {

    case ACTIONS.SCAN:
      console.debug('perform a scan of DOM content')
      // Search all terms that starts by a capital or a small letter followed by
      // a capital (like `iPhone`)
      document.body.textContent.match(scanner)
        .map(word => word.trim())
        // Exclude all terms that contains less than 5 letters
        .filter(word => word.length > 5)
        // Ask the indexer for results
        .forEach(word => {
          browser.runtime.sendMessage({
            action: ACTIONS.SEARCH,
            query: word
          })
          .then(handleMessage)
        })
      break

    case ACTIONS.FOUND:
      // Early return if no articles found
      if (!request.articles.length) break

      console.debug(`article(s) found for term ${request.query}:`, request.articles)
      break

  }
}

// Register for background scripts messages
browser.runtime.onMessage.addListener(handleMessage)
