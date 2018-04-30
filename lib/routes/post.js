const router = require('express').Router();
const PostController = require('../controllers/post');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all', PostController.findAll);
router.get('/find-by-id/:_id', PostController.findById);
router.post('/add', PostController.add);
router.post('/delete', PostController.delete);
module.exports = router;
