const questionRouter = require('../api/question')
const answerRouter = require('../api/answer')
const topicRouter = require('../api/topic')
const subjectRouter = require('../api/subject')
const setRouter = require('../api/set')
const loginController = require('./login')
const homeController = require('./home')

module.exports = (app) => {
  app.use('/', loginController)
  app.use('/home', homeController)
  app.use('/api/question', questionRouter)
  app.use('/api/answer', answerRouter)
  app.use('/api/topic', topicRouter)
  app.use('/api/subject', subjectRouter)
  app.use('/api/set', setRouter)
}
