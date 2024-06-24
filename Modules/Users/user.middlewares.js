const Joi = require("joi");


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


module.exports = {  validateCreate, validatelogIN}