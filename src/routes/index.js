const questionRouter = require('./question')
const answerRouter = require('./answer')
const topicRouter = require('./topic')
const subjectRouter = require('./subject')
const loginController = require('./login')
const homeController = require('./home')

module.exports = (app) => {
  app.use('/question', questionRouter)
  app.use('/answer', answerRouter)
  app.use('/topic', topicRouter)
  app.use('/subject', subjectRouter)
  app.use('/login', loginController)
  app.use('/home', homeController)
}
