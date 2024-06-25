const express = require('express');
const {
  createBankAccount,
  showBalance,
  depositFunds,
  withdrawFunds,
  getTransactions,
  getTransactionById
} = require('./bankAccount.controller');

const { validateFunds } = require('./bankAccount.middlewares');
const { isAuthorized } = require('../Users/user.middlewares');

const bankAccountRouter = express.Router();

/**
 * @swagger
 * /bankAccount/create:
 *   post:
 *     summary: Create a new bank account
 *     tags: [BankAccount]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Bank account created successfully
 *       400:
 *         description: Bad Request
 */
bankAccountRouter.route('/create').post(isAuthorized, createBankAccount);

/**
 * @swagger
 * /bankAccount/balance:
 *   get:
 *     summary: Show account balance
 *     tags: [BankAccount]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account balance retrieved successfully
 *       401:
 *         description: Unauthorized
 */
bankAccountRouter.route('/balance').get(isAuthorized, showBalance);

/**
 * @swagger
 * /bankAccount/deposit:
 *   post:
 *     summary: Deposit funds into account
 *     tags: [BankAccount]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100.0
 *     responses:
 *       200:
 *         description: Funds deposited successfully
 *       400:
 *         description: Bad Request
 */
bankAccountRouter.route('/deposit').post(isAuthorized, validateFunds, depositFunds);

/**
 * @swagger
 * /bankAccount/withdraw:
 *   post:
 *     summary: Withdraw funds from account
 *     tags: [BankAccount]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50.0
 *     responses:
 *       200:
 *         description: Funds withdrawn successfully
 *       400:
 *         description: Bad Request
 */
bankAccountRouter.route('/withdraw').post(isAuthorized, validateFunds, withdrawFunds);

/**
 * @swagger
 * /bankAccount/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [BankAccount]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 */
bankAccountRouter.route('/transactions').get(isAuthorized, getTransactions);

/**
 * @swagger
 * /bankAccount/transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [BankAccount]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
bankAccountRouter.route('/transactions/:id').get(isAuthorized, getTransactionById);

module.exports = { bankAccountRouter };
