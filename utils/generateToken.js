const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


dotenv.config()


const generateToken = async (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const options = {
        expiresIn: '1h', 
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, options);
    return token;
}


module.exports = { generateToken };