const Router = require('express');
const router = new Router();

const timerRouter = require('./timer.route');

router.use('/timer', timerRouter);

module.exports = router;