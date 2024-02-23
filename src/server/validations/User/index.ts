import { Joi, Segments, celebrate } from 'celebrate';

const createUserValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required()
    })
}, { abortEarly: false });

export { createUserValidation };