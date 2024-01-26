
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            car_item_id: Joi.number().integer(),car_id: Joi.number().required(),item_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            car_item_id: Joi.number().integer(),car_id: Joi.number().required(),item_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        