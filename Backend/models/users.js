const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    hashedPassword: { type: String, required: true },
    mobile: { type: String, required: true, unique: true, length: 10 },
    balance: { type: Number, required: true }
  });
  

    async function initializePassword(password) {
        this.hashedPassword = await bcrypt.hash(password, 10);
    }

     function deposit(amount) {
        this.balance += amount;
        this.transactions.push({ type: 'deposit', amount });
    }

    function withdraw(amount) {
        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
        this.transactions.push({ type: 'withdraw', amount });
    }

module.exports = userSchema;
