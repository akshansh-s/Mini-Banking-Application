const User = require('../models/users');
const Transaction = require('../models/transactions');

exports.transfer = async (req, res) => {
    const { recipientMobile, amount } = req.body;
    try {
        const sender = await User.findById(req.user.id);
        const recipient = await User.findOne({ mobile: recipientMobile });

        if (!recipient) {
            return res.status(404).send('Recipient not found');
        }

        if (sender.balance < amount) {
            return res.status(400).send('Insufficient balance');
        }

        sender.balance -= amount;
        recipient.balance += amount;

        // for record-keeping
        const newTransaction = new Transaction({
            type: 'transfer',
            amount: amount,
            user: sender._id, // sender's ID
            recipient: recipient._id, // recipient's ID
        });

        await newTransaction.save();

        await sender.save();
        await recipient.save();
        res.send({
            message: 'Transfer successful',
            transaction: newTransaction
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.history = async (req,res)=>{
    
    try{
        const userId= await User.findById(req.user.id);

        const transactions = await Transaction.find({
            $or: [{ user: userId }, { recipient: userId }]
        }, 'type user recipient amount createdAt') // Select specific fields to return
        .sort({ createdAt: -1 });

        res.json(transactions);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
