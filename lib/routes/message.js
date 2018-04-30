const router = require('express').Router();
const MessageController = require('../controllers/message');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all', MessageController.findAll);
router.get('/find-by-id/:_id', MessageController.findById);
router.post('/add', MessageController.add);
router.post('/delete', MessageController.delete);
module.exports = router;
