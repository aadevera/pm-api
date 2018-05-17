const router = require('express').Router();
const CommentController = require('../../controllers/comment');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all/:postid', CommentController.findAll);
router.get('/find-by-id/:commentid', CommentController.findById);
router.post('/add/:postid', CommentController.add);
router.post('/delete/', CommentController.delete);
router.post('/edit/', CommentController.edit)
module.exports = router;
