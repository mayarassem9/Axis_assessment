const { BankAccount, Transaction } = require('./bankAccount.model');



const showBalance = async (req, res, next) => {
    try {
        const { user } = req;
        const bankAccount = await BankAccount.findOne({user: user.id});
        if(!bankAccount) return res.status(404).json({data: null, message: "You need to create a bank account", errors: null});
        res.status(200).json({data: {balance: bankAccount.balance}, message: "Balance retrieved successfully", errors: null});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({data: null, message: "Internal Server Error", errors: null});
    }
}


const createBankAccount = async (req, res, next) => {
    try {
        const { user } = req;

        const exists = await BankAccount.findOne({user: user.id});
    
        if(exists) return res.status(400).json({data: null, message: "Bank Account already exists", errors: null});
        
        const bankAcc = new BankAccount({user: user.id, balance: 0});
        await bankAcc.save();
        res.status(200).json({data: {bankAcc}, message: "Bank Account created successfully", errors:null});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({data: null, message: "Internal Server Error", errors: null})
    }
}


const withdrawFunds = async (req, res, next) => {
    try {
        const {user} = req;
        const acc = await BankAccount.findOne({user: user.id});

        if(!acc) return res.status(500).json({data: null, message: "Bank account does not exist", errors: null});
        
        const { amount } = req.body;

        const transaction = new Transaction({amount, type: "withdrawal", bankAccount: acc._id, status: "rejected", bank: acc._id});

        if(amount > acc.balance) {
            await transaction.save();
            return res.status(400).json({data: {transaction}, message: "Insufficient funds", errors: null});
        } 

        acc.balance -= amount;
        transaction.status = "accepted";
        await transaction.save();
        await acc.save();
        res.status(200).json({data: {transaction}, message: "Withdrawal successful", errors: null});
    } catch(error) {
        console.log(error.message);
        res.status(500).json({data: null, message: "Internal Server Error", errors: null});
    }
}


const depositFunds = async (req, res, next) => {
    try {
        const { user } = req;
        const acc = await BankAccount.findOne({user: user.id});

        if(!acc) return res.status(404).json({data: null, message: "Bank account does not exist", errors: null});

        const { amount } = req.body;
        const transaction = new Transaction({amount, type: "deposit", bankAccount: acc._id, status: "accepted", bank: acc._id});
        acc.balance += amount;
        await transaction.save();
        await acc.save();
        res.status(200).json({data: {transaction}, message: "Money deposited successfully", errors: null});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({data: null, message: "Internal Server Error", errors: null});
    }
}
const getTransactions = async (req, res, next) => {
    try {
        const { user } = req;
        const acc = await BankAccount.findOne({user: user.id});
        if(!acc) return res.status(404).json({data: null, message: "Bank account does not exist", errors: null});
        const transactions = await Transaction.find({bankAccount: acc._id});
        res.status(200).json({data: {transactions}, message: "Transactions retrieved successfully", errors: null});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({data: null, message: "Internal Server Error", errors: null});
    }
}
const getTransactionById = async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const acc = await BankAccount.findOne({user: user.id});
        if(!acc) return res.status(404).json({data: null, message: "Bank account does not exist", errors: null});
        const transaction = await Transaction.findOne({_id: id, bankAccount: acc._id});
        if(!transaction) return res.status(404).json({data: null, message: "Transaction does not exist", errors: null});
        res.status(200).json({data: {transaction}, message: "Transaction retrieved successfully", errors: null});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({data: null, message: "Internal Server Error", errors: null});
    }

}



module.exports = { createBankAccount, showBalance, depositFunds, withdrawFunds, getTransactions, getTransactionById};