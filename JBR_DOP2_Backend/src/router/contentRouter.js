const Router = require('express');
const contentController = require('../controller/accessController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/user', [authMiddleware, roleMiddleware(['USER', 'ADMIN'])], contentController.getRole);
router.post('/admin', [authMiddleware, roleMiddleware(['ADMIN']) ], contentController.getRole);
router.get('/', [], contentController.hello);

module.exports = router;
