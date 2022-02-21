const { celebrate, Joi } = require('celebrate')

module.exports.userValidator = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({

        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.number().required()



    })
})