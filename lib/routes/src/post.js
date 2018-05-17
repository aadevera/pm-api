const router = require('express').Router();
const PostController = require('../../controllers/post');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all/:classid', PostController.findAll);
router.get('/find-by-id/:postid', PostController.findById);
router.post('/add/:classid', PostController.add);
router.post('/delete/:postid', PostController.delete);
router.post('/edit/:postid', PostController.edit)
module.exports = router;
