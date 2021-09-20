const jwt = require('jsonwebtoken');
const {secret} = require('../../config');

module.exports = function (roles) {
    return function (req, res, next) {;
        if (req.method === 'OPTIONS') {
            next();
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({message: 'No token'});
        }

        const {role: userRole} = jwt.verify(token, secret);
        const access = roles.some((role) => role === userRole);

        if (!access) {
            return res.status(403).json({message: 'No access'});
        }

        next();
    }
};
