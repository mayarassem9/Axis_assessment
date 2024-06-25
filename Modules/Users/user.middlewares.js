const Joi = require("joi");
const jwt = require("jsonwebtoken");

const validateCreate = (req, res, next) => {
    const { name, email, password } = req.body;

    
    const validationObject = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z]).+$')).min(8).required().messages({
            "string.base": "Password must contain at least one lowercase and one uppercase letter",
            "string.min": "Password must contain at least 8 characters"
        })
    })

    const validationResults = validationObject.validate({name, email, password});
    if(validationResults.error) return res.status(400).json({error: validationResults.error.details, data: null, message: "Error validating the body of the request"});
    next();
}
 const validatelogIN = (req, res, next) => {
    const{email, password} = req.body;
    const validationObject = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z]).+$')).min(8).required().messages({
            "string.base": "Password must contain at least one lowercase and one uppercase letter",
            "string.min": "Password must contain at least 8 characters"
        })
    })
    const validationResults = validationObject.validate({email, password});
    if(validationResults.error) return res.status(400).json({error: validationResults.error.details, data: null, message: "Error validating the body of the request"});
    next();
}


const isAuthorized = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) return res.status(401).json({data: null, message: "Unauthorized to access this request", errors: null});
    const token = authHeader.split(" ")[1];    
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(401).json({data: null, message: "Unauthorized to access this request", errors: null});
        req.user = decoded;
        next();
});
}

module.exports = {  validateCreate, validatelogIN, isAuthorized }