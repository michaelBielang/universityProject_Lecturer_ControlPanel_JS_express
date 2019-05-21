const questionRouter = require('../api/question')
const answerRouter = require('../api/answer')
const topicRouter = require('../api/topic')
const subjectRouter = require('../api/subject')
const loginController = require('./login')
const homeController = require('./home')
const logoutController = require('./logout')

module.exports = (app) => {
  app.use('/', loginController)
  app.use('/question', questionRouter)
  app.use('/answer', answerRouter)
  app.use('/topic', topicRouter)
  app.use('/subject', subjectRouter)
  app.use('/home', homeController)
  app.use('/logout', logoutController)
}
