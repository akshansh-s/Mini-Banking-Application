const bcrypt = require('bcrypt');
const z = require('zod');

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  mobile: z.string().length(10, "Mobile number must be exactly 10 digits long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  balance: z.number().nonnegative("Balance cannot be negative"),
});

    async function initializePassword(password) {
        this.hashedPassword = await bcrypt.hash(password, 10);
    }

     function deposit(amount) {
        this.balance += amount;
        this.transactions.push({ type: 'deposit', amount });
    }

    withdraw(amount) {
        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
        this.transactions.push({ type: 'withdraw', amount });
    }
}

module.exports = userSchema;
