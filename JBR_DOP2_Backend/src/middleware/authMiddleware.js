const jwt = require('jsonwebtoken');
const {secret} = require('../../config');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: 'User not authorized'});
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({message: 'User not authorized'});
        }

        const data = jwt.verify(token, secret);

        req.user = data;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: 'User not authorized'});
    }
};
