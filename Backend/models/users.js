const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    mobile: { type: String, required: true, unique: true, length: 10 },
    hashedPassword: { type: String, required: true },
    balance: { type: Number, required: true, default:0, min: [0, 'Balance cannot be negative'] }
  });
  

userSchema.pre('save', async function(next) {
    if (!this.isModified('hashedPassword')) return next();
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.hashedPassword);
};
  

    //  function deposit(amount) {
    //     this.balance += amount;
    //     this.transactions.push({ type: 'deposit', amount });
    // }

    // function withdraw(amount) {
    //     if (amount > this.balance) {
    //         throw new Error('Insufficient funds');
    //     }
    //     this.balance -= amount;
    //     this.transactions.push({ type: 'withdraw', amount });
    // }

const User = mongoose.model('User', userSchema);
module.exports = User;
