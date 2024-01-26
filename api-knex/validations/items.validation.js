
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            item_id: Joi.number().integer(),item_name: Joi.string().required(),item_barcode: Joi.string().required(),item_price: Joi.number().required(),item_qty: Joi.number().required(),item_note: Joi.string().optional().allow(null,''),user_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            item_id: Joi.number().integer(),item_name: Joi.string().required(),item_barcode: Joi.string().required(),item_price: Joi.number().required(),item_qty: Joi.number().required(),item_note: Joi.string().optional().allow(null,''),user_id: Joi.number().required(),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        