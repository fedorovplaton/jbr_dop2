const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const {secret} = require('../../config');
const User = require('../mongoModel/User');

const generateAccessToken = (id, role) => {
    return jwt.sign({id, role}, secret, {expiresIn: '24h'});
};

class authController {
    async registration(req, res) {
        try {
            const validationErrors = validationResult(req);

            if (!validationErrors.isEmpty()) {
                return res.status(400).json({message: 'Registration error:', validationErrors});
            }

            const {username, password} = req.body;
            const userInDb = await User.findOne({username});

            if (userInDb) {
                return res.status(400).json({message: 'Username is already taken'});
            }

            const hashedPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashedPassword});

            await user.save();

            return res.json({message: 'Ok'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: `Registration error: ${e.text()}`});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});

            if (!user) {
                return res.status(400).json({message: `No user`});
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({message: `Wrong password`});
            }

            const token = generateAccessToken(user._id, user.role);

            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: `Login error`});
        }
    }
}

module.exports = new authController();
