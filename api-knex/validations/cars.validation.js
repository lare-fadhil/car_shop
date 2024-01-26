
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            car_id: Joi.number().integer(),car_name: Joi.string().required(),car_model: Joi.string().optional().allow(null,''),car_year: Joi.string().optional().allow(null,''),car_note: Joi.string().optional().allow(null,''),user_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            car_id: Joi.number().integer(),car_name: Joi.string().required(),car_model: Joi.string().optional().allow(null,''),car_year: Joi.string().optional().allow(null,''),car_note: Joi.string().optional().allow(null,''),user_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        