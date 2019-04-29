const questionRouter = require('./question');
const answerRouter = require('./answer');
const topicRouter = require('./topic');
const subjectRouter = require('./subject');

module.exports = (app) => {
  app.use('/question', questionRouter);
  app.use('/answer', answerRouter);
  app.use('/topic', topicRouter);
  app.use('/subject', subjectRouter);
};