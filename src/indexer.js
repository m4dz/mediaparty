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

import 'lib/strip_tags'

import lunr from 'lunr'
require('lunr-languages/lunr.stemmer.support')(lunr)
require('lunr-languages/lunr.fr')(lunr)

export const API = {
  _endpoint: 'https://api.mediapart.fr/v1/main',

  getNodes() {
    return fetch(this._endpoint)
      .then(res => res.json())
      .then(json => this.nodesToDict(json.data.nodes))
  },
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

export const initIndex = dict => new Promise((resolve, reject) => {
  const idx = lunr(function () {
    this.use(lunr.fr)

    this.ref('id')
    this.field('title')
    this.field('text')

    for (let [id, doc] of dict.entries()) {
      this.add(doc)
    }
  })

  resolve(idx)
})

browser.runtime.onStartup.addListener(() => {
  API
    .getNodes()
    .then(dict => initIndex(dict))
    .then(idx => console.debug('search', idx))
})
