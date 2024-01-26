
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            invoice_item_id: Joi.number().integer(),invoice_id: Joi.number().required(),item_id: Joi.number().required(),invoice_item_price: Joi.number().required(),invoice_item_qty: Joi.number().required(),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            invoice_item_id: Joi.number().integer(),invoice_id: Joi.number().required(),item_id: Joi.number().required(),invoice_item_price: Joi.number().required(),invoice_item_qty: Joi.number().required(),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        