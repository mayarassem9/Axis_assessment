const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankAccountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
});


const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: string,
        required: true,
        enum: ['withdrawal', 'deposit']
    },
    bankAccount: {
        type: Schema.Types.ObjectId,
        ref: 'BankAccount',
        required: true
    },
    status: {
        type: string,
        required: true,
        enum: ['accepted', 'rejected']
    }
})

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = { BankAccount, Transaction };
