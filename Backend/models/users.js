//const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    mobile: { type: String, required: true, unique: true, length: 10 },
    hashedPassword: { type: String, required: true },
    balance: { type: Number, required: true, default:0, min: [0, 'Balance cannot be negative'] }
  });
  

  userSchema.methods.hashPassword = async function(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  };
  
  userSchema.methods.comparePassword = async function(password) {
    const isMatch = await argon2.verify(this.hashedPassword, password);
    return isMatch;
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
