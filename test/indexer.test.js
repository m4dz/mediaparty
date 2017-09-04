/**
 * src/indexer.js specs file
 *
 */

'use strict'

const expect = chai.expect
const fixturesAPIEndpoint = require('./fixtures/api_endpoint.json')

const lunr = require('lunr')

const { API, initIndex } = require('indexer')

describe('Indexer', () => {

  describe('API', () => {
    beforeEach(() => {
      const res = new window.Response(JSON.stringify(fixturesAPIEndpoint), {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      })

      sinon.stub(window, 'fetch')
      window.fetch.returns(Promise.resolve(res))
    })

    afterEach(() => {
      window.fetch.restore()
    })

    it('returns a promise when getting nodes', () => {
      const dict = API.getNodes()
      expect(dict).to.be.a('promise')
    })

    it('performs a request to mediapart API when getting nodes', () => {
      const dict = API.getNodes()
      expect(window.fetch).have.been.calledOnce
      expect(window.fetch).have.been.calledWith(API._endpoint)
    })

    it('gets all nodes in a Map', () => {
      const dict = API.getNodes()
      expect(dict).to.eventually.have.property('size').that.is.equal(10)
    })

    it('maps nodes by ref', () => {
      const dict = API.getNodes()
      expect(dict).to.be.fulfilled.then(dict => {
        expect(dict.get(1).id).to.equal(1)
        expect(dict.get(5).id).to.equal(5)
      })
    })

    it('keep keys/values consistent in mapped objects', () => {
      const dict = API.getNodes()
      expect(dict).to.be.fulfilled.then(dict => {
        expect(dict.get(1)).to.deep.equal(fixturesAPIEndpoint[0])
      })
    })
  })

  describe('Index', () => {
    it('returns a promise at init', () => {
      const idx = initIndex(new Map())
      expect(idx).to.be.a('promise')
    })

    it('resolve with a Lunr index', () => {
      expect(initIndex(new Map())).to.eventually.be.an.instanceof(lunr.Index)
    })
  })

})
