
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            expense_id: Joi.number().integer(),expense_amount: Joi.number().required(),expense_note: Joi.string().optional().allow(null,''),expense_date: Joi.date().optional().allow(null,''),user_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            expense_id: Joi.number().integer(),expense_amount: Joi.number().required(),expense_note: Joi.string().optional().allow(null,''),expense_date: Joi.date().optional().allow(null,''),user_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        