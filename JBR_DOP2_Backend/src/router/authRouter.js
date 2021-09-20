const Router = require('express');
const {check} = require('express-validator');
const authController = require('../controller/authController');

const router = new Router();

router.post('/registration', [
    check('username', 'Validation error: Empty username').notEmpty(),
    check(
        'password',
        'Validation error: Password length should be in range from 4 to 30').isLength({min:4, max: 30}
    )
], authController.registration);
router.post('/login', authController.login);

module.exports = router;
