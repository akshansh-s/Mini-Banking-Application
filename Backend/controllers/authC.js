const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/users');

exports.signup = async (req, res) => {
    const { name, mobile, password, balance } = req.body;
    try {
        let user = await User.findOne({ mobile });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await User.schema.methods.hashPassword(password);
        user = new User({
            name,
            mobile,
            hashedPassword,
            balance
        });

        await user.save();

        const jwtPayload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.signin = async (req, res) => {
    const { mobile, password } = req.body;
    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(401).json({ message: 'This account does not exist' });
        }
        // const trial=await bcrypt.hash(password, 10);
        // console.log(trial);
        // console.log(user.hashedPassword);
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
