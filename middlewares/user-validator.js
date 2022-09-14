const {check, validationResult} = require ('express-validator');

const rules = [
    check('name')
    .notEmpty().withMessage('Name cannot be Empty')
    .bail(),
    check('email')
    .notEmpty().withMessage('Email cannot be Empty')
    .isEmail().withMessage('Enter with Correct Email')
    .bail(),
    check('mobile')
    .isInt().withMessage('Mobile must be a number')
    .bail(),
    check('address')
    .notEmpty().withMessage('Address cannot be Empty')
    .bail(),
];

const validateUserRegister = [
    rules,
    (req,res,next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        next();
    }
];

module.exports = validateUserRegister;