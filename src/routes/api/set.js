const express = require('express');
const {body, validationResult} = require('express-validator/check/index');
const database = require('../../controller/db_controller');
const router = express.Router();

router.get('/getAll/:topicId([0-9]+)', async (req, res, next) => {
    try {
        const data = await database.dbInterface.getSets(req.params.topicId);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});

router.get('/:setId([0-9]+)', async (req, res, next) => {
    try {
        const data = await database.dbInterface.getSet(req.params.setId);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});


router.post('/', [
    body('setName')
        .isLength({min: 1}),
    body('topicId')
        .isLength({min: 1}),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const data = await database.dbInterface.addSet(req.setName, req.topicId);
            res.json({data});
        } catch (e) {
            next({message: 'Something went wrong'});
        }
    } else {
        res.render('error', {
            title: 'Set Error',
            errors: errors.array(),
            data: req.body,
        })
    }
});

router.post('/update', [
    body('setName')
        .isLength({min: 1}),
    body('setId')
        .isLength({min: 1}),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const data = await database.dbInterface.updateSet(req.setName, req.setId);
            res.json({data});
        } catch (e) {
            next({message: 'Something went wrong'});
        }
    } else {
        res.render('error', {
            title: 'Set Error',
            errors: errors.array(),
            data: req.body,
        })
    }
});

router.delete('/:id([0-9]+)', async (req, res, next) => {
    try {
        const data = await database.dbInterface.deleteSet(req.params.id);
        res.json({data});
    } catch (e) {
        next({message: 'Something went wrong'});
    }
});

module.exports = router;
