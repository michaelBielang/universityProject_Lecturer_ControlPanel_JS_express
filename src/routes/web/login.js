/**
 * Created by Michael Bielang on 15.05.2019.
 * www.codemerger.com
 * bielang@codemerger.com
 *
 * Project:
 * java version "10.0.1"
 */
const express = require('express')
const database = require('../../controller/db_controller')
const ldapjs = require('ldapjs')
const router = express.Router()
const session = require('express-session')

// all following async functions are here for testing purposes only. Should be removed as soon as this app is finished
async function generateUserId (db) {
  return await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e', 'f')
}

async function generateSubjectId (db) {
  const userId = await generateUserId(db)
  console.log('userId: ' + userId)
  return await db.dbInterface.addSubject('subject', userId)
}

async function generateTopicId (db) {
  const subjectId = await generateSubjectId(db)
  console.log('subjectId: ' + subjectId)
  return await db.dbInterface.addTopic('topic', subjectId)
}

async function generateSetId (db) {
  const topicId = await generateTopicId(db)
  console.log('topicId: ' + topicId)
  return await db.dbInterface.addSet('set', topicId)
}

async function generateQuestionId (db) {
  const setId = await generateSetId(db)
  console.log('setId: ' + setId)
  return await db.dbInterface.addQuestion('question', setId)
}

async function generateAnswerId (db) {
  const answerId = await generateQuestionId(db)
  console.log('answerId: ' + answerId)
  return await db.dbInterface.addAnswer('answer', answerId)
}

/**
 * Sets HSA LDAP options
 * @param url
 * @returns {{idleTimeout: number, orgUnit: string, connectTimeout: number, url: *, timeout: number}}
 */
function ldapOptions (url) {
  return {
    url: url,
    timeout: 5000,
    connectTimeout: 10000,
    idleTimeout: 15000,
    orgUnit: 'ou=People,dc=fh-augsburg,dc=de'
  }
}

/**
 * Returns an LDAP Client for that session
 * @returns {Promise<any>}
 */
function getLdapClient () {
  return new Promise((resolve, reject) => {
    let conCount = 0
    let foundCon = false

    //
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
        // resolve for client 1 or 2
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

/**
 * Performs LDAP Auth process
 * @param client
 * @param user
 * @param pass
 * @returns {Promise<any>}
 */
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
  // init db model. Will be ignored if already applied
  await database.dbInterface.initDb()
  await Promise.resolve(resolve => setTimeout(resolve, 250))
  res.render('login', {Msg: 'Welcome'})
})

router.post('/', async (req, res, next) => {

  const password = req.body.password
  const rzId = req.body.rzLogin
  // TODO for testing
  await database.dbInterface.getUser(rzId)
    .then(() => {
      //case user is present
      return Promise.resolve()
    }, async () => {
      //case user is not present
      return await generateAnswerId(database)
    }).then(() => {
      session.user = rzId
      res.redirect('/home')
    }).catch(() => {
        res.render('login', {Msg: 'Welcome'})
      }
    )

  // TODO activate for production
  /*await getLdapClient().then(resolve => {
    return auth(resolve, rzId, password)
  }).then(() => {
    return database.dbInterface.getUser(rzId)
      .then(() => {
        //case user is present

        session.user = rzId
        return Promise.resolve()
      }, () => {
        //case user is not present

        return database.dbInterface.addUser(rzId, '', '', '', '', '')
      })
  }).then(() => {
    res.redirect('/home')
  }).catch((err) => {
      res.render('login', {
        title: 'Login form',
        errors: [err.message, 'Please try again!'],
        data: req.body,
      })
    }
  )*/
})

module.exports = router
