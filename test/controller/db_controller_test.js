/**
 * Created by Michael Bielang on 20.04.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
/**
 * Created by Michael Bielang on 28.11.2018.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
'use strict'
/* eslint-env node, mocha */
let mocha = require('mocha')
const describe = mocha.describe
const expect = require('chai').expect

describe('test init db', function () {
  const db = require('../../src/controller/db_controller')

  before(async function () {
    await db.dbInterface.dropDb()
    await db.dbInterface.initDb()
  })

  it('should work', function () {
    db.dbInterface.showTables().then(resolve => expect(JSON.stringify(resolve).includes('user')).to.equal(true))
  })
})
