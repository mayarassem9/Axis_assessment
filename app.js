const express = require('express');
const dotenv= require("dotenv");
const connectDB = require('./Config/db');
const { userRouter } = require('./Modules/Users/user.routes');
const app = express();
dotenv.config()
port = process.env.port

connectDB();

app.use(express.json());

app.use('/api/users', userRouter);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});