import { Joi, Segments, celebrate } from 'celebrate';

const createSpotValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        company: Joi.string().required(),
        price: Joi.number().required(),
        techs: Joi.array().items(Joi.string()).optional(),
        user_id: Joi.string().required()
    })
}, { abortEarly: false });

export { createSpotValidation };
