const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Middleware to authenticate and authorize user
const authenticate = async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;

            // Verify token
            const decoded = jwt.verify(token, process.env.SECRET);

            // Add user from payload
            req.user = await User.findById(decoded.id).select('-hashedPassword');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).send('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401).send('Not authorized, no token');
    }
};

module.exports= authenticate;