/**
 * Created by Michael Bielang on 15.05.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const express = require('express')
const database = require('../controller/db_controller')
const ldapjs = require('ldapjs')
const router = express.Router()

function ldapOptions (url) {
  return {
    url: url,
    timeout: 5000,
    connectTimeout: 10000,
    idleTimeout: 15000,
    orgUnit: 'ou=People,dc=fh-augsburg,dc=de'
  }
}

function getLdapClient () {
  return new Promise((resolve, reject) => {
    let conCount = 0
    let foundCon = false

    const srvNumbs = [1, 2]
    srvNumbs.map((srvNo) => {
      const options = ldapOptions('ldap://ldap' + srvNo + '.fh-augsburg.de')
      const client = ldapjs.createClient(options)
      client.on('error', err => {
        if (err) {
          console.log('LDAP server ' + srvNo + ' not reachable: ' + err['message'])
          conCount += 1
        }
      })

      client.on('connect', () => {
        foundCon = true
        resolve(client)
      })
    })

    setTimeout(() => {
      if (conCount === srvNumbs.length) {
        reject({
          message: 'No LDAP server reachable',
          status: 401
        })
      } else {
        setTimeout(() => {
          if (!foundCon) {
            console.log('LDAP server dns check timeout')
            reject({
              message: 'LDAP server dns check timeout',
              status: 401
            })
          }
        }, ldapOptions().timeout)
      }
    }, 1000)
  })
}

function auth (client, user, pass) {
  user = user.toLowerCase()
  return new Promise((resolve, reject) => {
    if (client) {
      client.bind('uid=' + user + ',' + ldapOptions()['orgUnit'], pass, err => {
        if (err) {
          reject({
            message: 'Authentication failed',
            status: 401
          })
        } else {
          resolve({
            message: 'Authenticated',
            userId: user
          })
        }
      })
    } else {
      reject({
        message: 'LDAP client unavailable',
        status: 404
      })
    }
  })
}

router.get('/', async (req, res) => {
  await database.dbInterface.initDb()
  res.render('login', {Msg: 'Welcome'})
})

router.post('/', async (req, res) => {

  const password = req.body.password
  const rzId = req.body.rzLogin
  await getLdapClient().then(resolve => {
    return auth(resolve, rzId, password)
  }).then(() => {
    return database.dbInterface.getUser(rzId)
      .then(() => {
        //case user is present

        this.userId = rzId
        return Promise.resolve()
      }, () => {
        //case user is not present

        return database.dbInterface.addUser('', '', '', '', '', rzId)
      })
  }).catch(err => {
      //TODO handle error case with view
      console.log('error: ' + err)
    }
  )

  res.render('login', {Msg: 'Welcome'})
})

module.exports = router
exports.userId = ''
