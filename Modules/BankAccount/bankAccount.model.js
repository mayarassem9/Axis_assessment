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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
});


const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['withdrawal', 'deposit']
    },
    bankAccount: {
        type: Schema.Types.ObjectId,
        ref: 'BankAccount',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['accepted', 'rejected']
    },
    bank: {
        type: Schema.Types.ObjectId,
        ref: "BankAccount",
        required: true
    }
})

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = { BankAccount, Transaction };
