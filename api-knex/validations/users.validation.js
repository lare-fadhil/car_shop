
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            user_id: Joi.number().integer(),user_name: Joi.string().required(),firebase_uid: Joi.string().required(),user_role: Joi.string().required(),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            user_id: Joi.number().integer(),user_name: Joi.string().required(),firebase_uid: Joi.string().required(),user_role: Joi.string().required(),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        