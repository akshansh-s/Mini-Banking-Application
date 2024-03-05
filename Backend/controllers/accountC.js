const User = require('../models/users');

exports.getBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ balance: user.balance });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deposit = async (req, res) => {
    const { amount } = req.body;
    try {
        let user = await User.findById(req.user.id);
        user.balance += amount;
        await user.save();
        res.json({ balance: user.balance });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.withdraw = async (req, res) => {
    const { amount } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (user.balance < amount) {
            return res.status(400).send('Insufficient balance');
        }
        user.balance -= amount;
        await user.save();
        res.json({ balance: user.balance });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
