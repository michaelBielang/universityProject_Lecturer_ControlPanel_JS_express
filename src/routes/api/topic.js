const express = require('express');
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

module.exports = router;
