import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string(),

})




export {
    signUpSchema,

}