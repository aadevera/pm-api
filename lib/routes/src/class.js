const app = require('express');
const router = app.Router();
const ClassController = require('../../controllers/class');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all/:userid', ClassController.findAll);
router.get('/find-by-id/:classid', ClassController.findById);
router.post('/add/:userid', ClassController.add);
router.post('/join/:userid', ClassController.join);
router.post('/delete', ClassController.delete);
router.post('/edit', ClassController.edit);
module.exports = router;
