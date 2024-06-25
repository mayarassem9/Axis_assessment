const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./Swagger'); 
const dotenv= require("dotenv");
const connectDB = require('./Config/db');
const { userRouter } = require('./Modules/Users/user.routes');
const {bankAccountRouter} = require('./Modules/BankAccount/bankAccount.routes')

const{error} = require('./MiddleWares/Erorr.middlewares')
const app = express();
dotenv.config()
port = process.env.port 

connectDB();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRouter);
app.use('/api/bank', bankAccountRouter);
app.use(error);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});