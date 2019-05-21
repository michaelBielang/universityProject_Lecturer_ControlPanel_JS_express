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

module.exports = router;
