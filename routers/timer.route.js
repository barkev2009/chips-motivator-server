const Router = require('express');
const router = new Router();
const timerController = require('../controllers/timer.controller');

router.post('/:device_id', timerController.registerTimer);
router.delete('/:device_id', timerController.unregisterTimer);
router.get('/', timerController.getTimers);
router.get('/:device_id', timerController.getTimer);

module.exports = router;