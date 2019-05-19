const express = require('express');
const {body, validationResult} = require('express-validator/check/index');
const database = require('../../controller/db_controller');
const router = express.Router();

router.get('/getAll/:subjectId([0-9]+)', async (req, res, next) => {
    try {
        const data = await database.dbInterface.getTopics(req.params.subjectId);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});

router.get('/:id([0-9]+)', async (req, res, next) => {
    try {
        const data = await database.dbInterface.getTopic(req.params.id);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});


router.post('/', [
    body('title')
        .isLength({min: 1}),
    body('subjectId')
        .isLength({min: 1}),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const data = await database.dbInterface.addTopic(req.title, req.subjectId);
            res.json({data});
        } catch (e) {
            next({message: 'Something went wrong'});
        }
    } else {
        res.render('error', {
            title: 'Title Error',
            errors: errors.array(),
            data: req.body,
        })
    }
});

router.post('/update', [
    body('newTopicName')
        .isLength({min: 1}),
    body('topicId')
        .isLength({min: 1}),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const data = await database.dbInterface.updateTopic(req.newTopicName, req.topicId);
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
        const data = await database.dbInterface.deleteTopic(req.params.id);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});

module.exports = router;
