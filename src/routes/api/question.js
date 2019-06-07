const express = require('express');
const database = require('../../controller/db_controller');
const router = express.Router();

router.get('/getAll/:topicId([0-9]+)', async (req, res, next) => {
    try {
        const data = await database.dbInterface.getQuestions(req.params.topicId);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});

router.get('/:questionId([0-9]+)', async (req, res, next) => {
    try {
        const data = await database.dbInterface.getQuestion(req.params.questionId);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});

module.exports = router;
