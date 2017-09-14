/**
 * INDEXER
 *
 * Main part of the extension that runs in background. It loads the Mediapart
 * homepage content as JSON and fill a Lunr index with it, so a fast search
 * through the content can be performed.
 */

// TODO: use Storage API to store the last sync timestamp
// TODO: use Alarm API to perform an index refresh every X minutes
// TODO: use Storage API to stores a serialized index and rehydrate it at start

'use strict'

// Extends String prototype with `stripTags` method
import 'lib/strip_tags'

// Import Lunr deps, with fr stemming
import lunr from 'lunr'
require('lunr-languages/lunr.stemmer.support')(lunr)
require('lunr-languages/lunr.fr')(lunr)

import { ACTIONS, ENDPOINT } from './config/constants.json'

/**
 * API related stuff
 */
export const API = {
  // XHR request to Mediapart endpoint,
  // that returns the JSON objects and map it to a MAP dictionnary
  getNodes() {
    return fetch(ENDPOINT)
      .then(res => res.json())
      .then(json => this.nodesToDict(json.data.nodes))
  },
  // Build a MAP from a list of nodes, indexed by `ref`, with sanitized fields
  nodesToDict(nodes) {
    let dict = new Map()
    nodes.forEach(node => {
      dict.set(node.id, {
        id: node.id.toString(),
        title: node.title,
        text: node.head_text.stripTags(),
        url: node.sharing.url
      })
    })
    return dict
  }
}

/**
 * Search index initialization
 * @param  {Map} dict    A MAP dict containing all nodes to index
 * @return {Promise}     A Promise that resolve w/ a search index and the dict
 */
export const initIndex = dict => new Promise((resolve, reject) => {
  const idx = lunr(function () {
    // Initialize the Lunr search engine
    this.use(lunr.fr)
    // Reference index and fields
    this.ref('id')
    this.field('title')
    this.field('text')
    // Add each node as an index entry
    for (let [id, doc] of dict.entries()) {
      this.add(doc)
    }
  })

  resolve([idx, dict])
})

/**
 * Main entrypoint
 */
export const init = () => {
  API
    .getNodes()
    .then(dict => initIndex(dict))
    .then(([idx, dict]) => {
      // Declates a handler for the content_script messages
      //
      // It performs a search for the given term, and returns the found articles
      // from the search index.
      const handleMessage = (request, sender, sendResponse) => {
        // Early return on non-search related payload
        if (request.action != ACTIONS.SEARCH) return
        // Get related entries from search index and map them to the dict nodes
        const res = idx
          .search(request.query)
          .map(index => dict.get(parseInt(index.ref, 10)))
        // Send results to content_script
        sendResponse({
          action: ACTIONS.FOUND,
          query: request.query,
          articles: res
        })
      }

      // Register the listener to content_script messages
      browser.runtime.onMessage.addListener(handleMessage)
    })
}
