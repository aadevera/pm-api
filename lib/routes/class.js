const router = require('express').Router();
const ClassController = require('../controllers/class');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all', ClassController.findAll);
router.get('/find-by-id/:_id', ClassController.findById);
router.post('/add', ClassController.add);
router.post('/delete', ClassController.delete);
module.exports = router;
