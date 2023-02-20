const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateRoomInput = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Room must have name'),
    check('size')
        .isInt({min: 2, max: 4})
        .withMessage('Room must have 2-4 players'),
    handleValidationErrors
]

module.exports = validateRoomInput;