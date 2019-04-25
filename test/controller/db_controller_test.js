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

async function generateUserId (db) {
  return await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e')
}

async function generateSubjectId (db) {
  const userId = await generateUserId(db)
  return await db.dbInterface.addSubject('test', userId)
}

async function generateTopicId (db) {
  const userId = await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e')
  const subjectId = await db.dbInterface.addSubject('test', userId)
  return await db.dbInterface.addTopic('test', subjectId)
}

async function generateQuestionId (db) {
  const topicId = await generateTopicId(db)
  return await db.dbInterface.addQuestion('test', topicId)
}

describe('test add user db', function () {
  const db = require('../../src/controller/db_controller')
  before(async function () {
    await db.dbInterface.setupAssociations()
    await new Promise(resolve => setTimeout(resolve, 250))
  })
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
    await db.dbInterface.setupAssociations()
    await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e').then(() => {
      return Promise.resolve()
    })
  })
  const db = require('../../src/controller/db_controller')
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
    await db.dbInterface.setupAssociations()
    await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e').then(() => {
      return Promise.resolve()
    })
  })
  const db = require('../../src/controller/db_controller')
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

describe('test add subject to db', function () {
  const db = require('../../src/controller/db_controller')
  let userId
  before(async () => {
    await db.dbInterface.setupAssociations()
    userId = await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e')
  })
  it('should work', async function () {
    await db.dbInterface.addSubject('subjectTest', userId).then((result) => {
      expect(isNaN(result)).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get subjects from db', function () {
  const db = require('../../src/controller/db_controller')
  let userId
  before(async function () {
    userId = await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e')
    await db.dbInterface.addSubject('subjectTest', userId).then(() => {
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getSubjects(userId).then((result) => {
      expect(JSON.stringify(result).includes('subjectTest')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get subject from db', function () {
  const db = require('../../src/controller/db_controller')
  let subjectId
  before(async function () {
    await await db.dbInterface.setupAssociations()
    const userId = await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e')
    await db.dbInterface.addSubject('subjectTest', userId).then(objId => {
      subjectId = objId
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getSubject(subjectId).then((result) => {
      expect(JSON.stringify(result).includes('subjectTest')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test delete subject from db', function () {
  const db = require('../../src/controller/db_controller')
  let subjectId
  let userId
  before(async function () {
    await await db.dbInterface.setupAssociations()
    userId = await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e')
    subjectId = await db.dbInterface.addSubject('deleteSubjectTest', userId)
  })
  it('should work', async function () {
    db.dbInterface.deleteSubject(subjectId)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getSubjects(userId).then((result) => {
      expect(JSON.stringify(result).includes('deleteSubjectTest')).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test update subject in db', function () {
  const db = require('../../src/controller/db_controller')
  let subjectId
  let userId
  before(async function () {
    await db.dbInterface.setupAssociations()
    userId = await db.dbInterface.addUser('a', 'b', 'c', 'd', 'e')
    subjectId = await db.dbInterface.addSubject('updateSubject', userId)
  })
  it('should work', async function () {
    await db.dbInterface.updateSubject('success', subjectId)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getSubject(subjectId).then((result) => {
      expect(JSON.stringify(result).includes('success')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test add topic to db', function () {
  const db = require('../../src/controller/db_controller')
  let subjectId
  before(async function () {
    await db.dbInterface.setupAssociations()
    subjectId = await generateSubjectId(db)
  })
  it('should work', async function () {
    await db.dbInterface.addTopic('test', subjectId).then((result) => {
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
  const db = require('../../src/controller/db_controller')
  let subjectId
  before(async function () {
    await db.dbInterface.setupAssociations()
    subjectId = await generateSubjectId(db)
    await db.dbInterface.addTopic('topicTest', subjectId).then(() => {
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getTopics(subjectId).then((result) => {
      expect(JSON.stringify(result).includes('topicTest')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get topic from db', function () {
  const db = require('../../src/controller/db_controller')
  let id
  before(async function () {
    await db.dbInterface.setupAssociations()
    const subjectId = await generateSubjectId(db)
    await db.dbInterface.addTopic('topicTest', subjectId).then(objId => {
      id = objId
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getTopic(id).then((result) => {
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
  const db = require('../../src/controller/db_controller')
  let topicID
  let subjectId
  before(async function () {
    await db.dbInterface.setupAssociations()
    subjectId = await generateSubjectId(db)
    topicID = await db.dbInterface.addTopic('deleteTopicTest2', subjectId)
  })
  it('should work', async function () {
    db.dbInterface.deleteTopic(topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getTopics(subjectId).then((result) => {
      expect(JSON.stringify(result).includes('deleteTopicTest2')).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test update topic in db', function () {
  const db = require('../../src/controller/db_controller')
  let topicID
  before(async function () {
    await db.dbInterface.setupAssociations()
    const subjectId = await generateSubjectId(db)
    await db.dbInterface.addTopic('updateTopic', subjectId).then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    db.dbInterface.updateTopic('success', topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getTopic(topicID).then((result) => {
      expect(JSON.stringify(result).includes('success')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test add question to db', function () {
  const db = require('../../src/controller/db_controller')
  let topicId
  before(async function () {
    await db.dbInterface.setupAssociations()
    topicId = await generateTopicId(db)
  })
  it('should work', async function () {
    await db.dbInterface.addQuestion('questionTest', topicId).then((result) => {
      expect(isNaN(result)).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get questions from db', function () {
  const db = require('../../src/controller/db_controller')
  let topicId
  before(async function () {
    await db.dbInterface.setupAssociations()
    topicId = await generateTopicId(db)
    await db.dbInterface.addQuestion('questionTest', topicId)
  })
  it('should work', async function () {
    await db.dbInterface.getQuestions(topicId).then((result) => {
      expect(JSON.stringify(result).includes('questionTest')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get question from db', function () {
  const db = require('../../src/controller/db_controller')
  let id
  before(async function () {
    await db.dbInterface.setupAssociations()
    const topicId = await generateTopicId(db)
    await db.dbInterface.addQuestion('questionsTest', topicId).then(objId => {
      id = objId
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getQuestion(id).then((result) => {
      expect(JSON.stringify(result).includes('questionsTest')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test delete question from db', function () {
  const db = require('../../src/controller/db_controller')
  let questionId
  let topicId
  before(async function () {
    await db.dbInterface.setupAssociations()
    topicId = await generateTopicId(db)
    questionId = await db.dbInterface.addQuestion('deleteQuestion', topicId)
  })
  it('should work', async function () {
    db.dbInterface.deleteQuestion(questionId)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getQuestions(topicId).then((result) => {
      expect(JSON.stringify(result).includes('deleteQuestion')).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test update question in db', function () {
  const db = require('../../src/controller/db_controller')
  let topicID
  before(async function () {
    await db.dbInterface.setupAssociations()
    const topicId = await generateTopicId(db)
    await db.dbInterface.addQuestion('updateQuestion', topicId).then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    db.dbInterface.updateQuestion('success', topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getQuestion(topicID).then((result) => {
      expect(JSON.stringify(result).includes('success')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test add answer to db', function () {
  const db = require('../../src/controller/db_controller')
  it('should work', async function () {
    await db.dbInterface.setupAssociations()
    const questionId = await generateQuestionId(db)
    await db.dbInterface.addAnswer('answerTest', false, questionId).then((result) => {
      expect(isNaN(result)).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get answers from db', function () {
  const db = require('../../src/controller/db_controller')
  let questionId
  before(async function () {
    await db.dbInterface.setupAssociations()
    questionId = await generateQuestionId(db)
    await db.dbInterface.addAnswer('answersTest', false, questionId).then(() => {
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getAnswers(questionId).then((result) => {
      expect(JSON.stringify(result).includes('answersTest')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test get answer from db', function () {
  const db = require('../../src/controller/db_controller')
  let id
  before(async function () {
    await db.dbInterface.setupAssociations()
    const questionId = await generateQuestionId(db)
    await db.dbInterface.addAnswer('answerTest', false, questionId).then(objId => {
      id = objId
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getAnswer(id).then((result) => {
      expect(JSON.stringify(result).includes('answerTest')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test delete answers from db', function () {
  const db = require('../../src/controller/db_controller')
  let answerId
  let questionId
  before(async function () {
    await db.dbInterface.setupAssociations()
    questionId = await generateQuestionId(db)
    answerId = await db.dbInterface.addAnswer('deleteAnswer', false, questionId)
  })
  it('should work', async function () {
    db.dbInterface.deleteAnswer(answerId)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getAnswers(questionId).then((result) => {
      expect(JSON.stringify(result).includes('deleteAnswer')).equal(false)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

describe('test update answer in db', function () {
  const db = require('../../src/controller/db_controller')
  let topicID
  before(async function () {
    await db.dbInterface.setupAssociations()
    const questionId = await generateQuestionId(db)
    await db.dbInterface.addAnswer('updateAnswer', false, questionId).then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.updateAnswer('success', topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getAnswer(topicID).then((result) => {
      expect(JSON.stringify(result).includes('success')).equal(true)
      return Promise.resolve()
    })
  })
  after(async () => {
      await db.dbInterface.dropDb()
    }
  )
})

