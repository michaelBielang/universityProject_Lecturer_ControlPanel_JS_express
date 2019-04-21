/**
 * Created by Michael Bielang on 20.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */

// TODO
// make script running "db-test": "mocha src/controller/db_controller_test.js"
// make script "db-test": "mocha src/controller/db_controller_test.js" creating a sqlite db if not present
'use strict'
/* eslint-env node, mocha */
let mocha = require('mocha')
const describe = mocha.describe
const expect = require('chai').expect

describe('test add user db', function () {
  const db = require('./db_controller')
  it('should work', async function () {
    await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e').then((result) => {
      expect(isNaN(result)).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get user db', function () {
  before(async function () {
    await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e').then(() => {
      return Promise.resolve()
    })
  })
  const db = require('./db_controller')
  it('should work', async function () {
    await db.dbInterface.getUser('c').then((result) => {
      expect(isNaN(result.id)).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test delete user db', function () {
  before(async function () {
    await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e').then(() => {
      return Promise.resolve()
    })
  })
  const db = require('./db_controller')
  it('should work', async function () {
    await db.dbInterface.getUser('c').then((result) => {
      expect(isNaN(result.id)).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test add topic to db', function () {
  const db = require('./db_controller')
  it('should work', async function () {
    await db.dbInterface.addTopic('test').then((result) => {
      expect(isNaN(result)).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get topics from db', function () {
  const db = require('./db_controller')
  before(async function () {
    await db.dbInterface.addTopic('topicTest').then(() => {
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getTopics().then((result) => {
      expect(JSON.stringify(result).includes('topicTest')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test delete topic from db', function () {
  const db = require('./db_controller')
  var topicID
  before(async function () {
    await db.dbInterface.addTopic('deleteTopicTest2').then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    db.dbInterface.deleteTopic(topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getTopics().then((result) => {
      expect(JSON.stringify(result).includes('deleteTopicTest2')).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})
