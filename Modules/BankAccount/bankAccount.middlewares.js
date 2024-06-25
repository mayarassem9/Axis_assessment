const joi = require('joi');

const validateFunds = (req, res, next) => {
    const { amount } = req.body;
    console.log(amount)
    const validationObject = joi.object({
        amount: joi.number().min(1).required()
    });

    const validationResult = validationObject.validate({amount});
    if(validationResult.error) return res.status(400).json({error: validationResult.error.details, data: null, message: "Error validating the body of the request"});
    next();
}   


module.exports = { validateFunds };