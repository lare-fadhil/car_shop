
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            invoice_id: Joi.number().integer(),invoice_name: Joi.string().required(),invoice_price: Joi.number().required(),invoice_discount: Joi.number().required(),invoice_date: Joi.date().optional().allow(null,''),invoice_note: Joi.string().optional().allow(null,''),user_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            invoice_id: Joi.number().integer(),invoice_name: Joi.string().required(),invoice_price: Joi.number().required(),invoice_discount: Joi.number().required(),invoice_date: Joi.date().optional().allow(null,''),invoice_note: Joi.string().optional().allow(null,''),user_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        