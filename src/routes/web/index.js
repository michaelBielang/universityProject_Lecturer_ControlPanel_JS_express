const questionRouter = require('../api/question')
const answerRouter = require('../api/answer')
const topicRouter = require('../api/topic')
const subjectRouter = require('../api/subject')
const setRouter = require('../api/set')
const loginController = require('./login')
const homeController = require('./home')
const session = require('express-session')

function sessionMiddleware(req, res, next) {
  if (session.user) {
    next();
  } else {
    res.redirect('/')
  }
}

module.exports = (app) => {
  app.use('/', loginController)
  app.use('/home', sessionMiddleware, homeController)
  app.use('/api/question', questionRouter)
  app.use('/api/answer', answerRouter)
  app.use('/api/topic', topicRouter)
  app.use('/api/subject', subjectRouter)
  app.use('/api/set', setRouter)
}
