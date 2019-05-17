const express = require('express');
const {body, validationResult} = require('express-validator/check');
const database = require('../controller/db_controller');
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


router.post('/', [
    body('question')
        .isLength({min: 1}),
    body('topicId')
        .isLength({min: 1}),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const data = await database.dbInterface.addQuestion(req.question, req.topicId);
            res.json({data});
        } catch (e) {
            next({message: 'Something went wrong'});
        }
    } else {
        res.render('error', {
            title: 'Question Error',
            errors: errors.array(),
            data: req.body,
        })
    }
});

router.post('/update', [
    body('newQuestion')
        .isLength({min: 1}),
    body('questionId')
        .isLength({min: 1}),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const data = await database.dbInterface.updateQuestion(req.newQuestion, req.questionId);
            res.json({data});
        } catch (e) {
            next({message: 'Something went wrong'});
        }
    } else {
        res.render('error', {
            title: 'Topic Error',
            errors: errors.array(),
            data: req.body,
        })
    }
});

router.delete('/:id([0-9]+)', async (req, res, next) => {
    try {
        const data = await database.dbInterface.deleteQuestion(req.params.id);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});

module.exports = router;