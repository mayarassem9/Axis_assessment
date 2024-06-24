const User = require("./user.model");
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/generateToken')
const createUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = new User({email, username: name, password});
        await user.save();
        res.json({data: {user}, message: "User created successfully", errors: null});
    }catch(err){
        console.error(err.message);
        res.status(404).send('not found');
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({data: null, message: "Invalid Credentials", errors: null});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(404).json({data: null, message: "Invalid Credentials", errors: null});
        const token = await generateToken(user);
        res.json({data: {token}, message: "User logged in successfully", errors: null});
    } catch (error) {
        console.error(err.message);
        res.status(404).send('Internal Server Error');    
    }
}


module.exports = { loginUser, createUser }