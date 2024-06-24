const express = require('express');
const {getUsers} = require('./user.controller');


const { loginUser, createUser } = require('./user.controller');
const { validateCreate } = require('./user.middlewares');

const userRouter = express.Router();

userRouter.route('/login').post(loginUser);
userRouter.route('/register').post(validateCreate, createUser)

module.exports = {userRouter};
