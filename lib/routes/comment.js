const router = require('express').Router();
const CommentController = require('../controllers/comment');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all', CommentController.findAll);
router.get('/find-by-id/:_id', CommentController.findById);
router.post('/add', CommentController.add);
router.post('/delete', CommentController.delete);
module.exports = router;
