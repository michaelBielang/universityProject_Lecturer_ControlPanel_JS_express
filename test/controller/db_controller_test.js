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
  const db = require('../../src/controller/db_controller')
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

describe('test add topic to db', function () {
  const db = require('../../src/controller/db_controller')
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
  const db = require('../../src/controller/db_controller')
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

describe('test get topic from db', function () {
  const db = require('../../src/controller/db_controller')
  var id
  before(async function () {
    await db.dbInterface.addTopic('topicTest').then(objId => {
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

describe('test update topic in db', function () {
  const db = require('../../src/controller/db_controller')
  var topicID
  before(async function () {
    await db.dbInterface.addTopic('updateTopic').then((result) => {
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

describe('test add subject to db', function () {
  const db = require('../../src/controller/db_controller')
  it('should work', async function () {
    await db.dbInterface.addSubject('subjectTest').then((result) => {
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
  before(async function () {
    await db.dbInterface.addSubject('subjectTest').then(() => {
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getSubjects().then((result) => {
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
  var id
  before(async function () {
    await db.dbInterface.addSubject('subjectTest').then(objId => {
      id = objId
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getSubject(id).then((result) => {
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
  var topicID
  before(async function () {
    await db.dbInterface.addSubject('deleteSubjectTest').then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    db.dbInterface.deleteSubject(topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getSubjects().then((result) => {
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
  var topicID
  before(async function () {
    await db.dbInterface.addSubject('updateSubject').then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    db.dbInterface.updateSubject('success', topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getSubject(topicID).then((result) => {
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
  it('should work', async function () {
    await db.dbInterface.addQuestion('questionTest').then((result) => {
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
  before(async function () {
    await db.dbInterface.addQuestion('questionTest').then(() => {
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getQuestions().then((result) => {
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
  var id
  before(async function () {
    await db.dbInterface.addQuestion('questionsTest').then(objId => {
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
  var topicID
  before(async function () {
    await db.dbInterface.addQuestion('deleteQuestion').then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    db.dbInterface.deleteQuestion(topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getQuestions().then((result) => {
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
  var topicID
  before(async function () {
    await db.dbInterface.addQuestion('updateQuestion').then((result) => {
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

//new

describe('test add answer to db', function () {
  const db = require('../../src/controller/db_controller')
  it('should work', async function () {
    await db.dbInterface.addAnswer('answerTest').then((result) => {
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
  before(async function () {
    await db.dbInterface.addAnswer('answersTest').then(() => {
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    await db.dbInterface.getAnswers().then((result) => {
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
  var id
  before(async function () {
    await db.dbInterface.addAnswer('answerTest').then(objId => {
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
  var topicID
  before(async function () {
    await db.dbInterface.addAnswer('deleteAnswer').then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    db.dbInterface.deleteAnswer(topicID)
    await new Promise(resolve => setTimeout(resolve, 250))
    await db.dbInterface.getAnswers().then((result) => {
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
  var topicID
  before(async function () {
    await db.dbInterface.addAnswer('updateAnswer').then((result) => {
      topicID = result
      return Promise.resolve()
    })
  })
  it('should work', async function () {
    db.dbInterface.updateAnswer('success', topicID)
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
