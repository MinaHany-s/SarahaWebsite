import joi from 'joi';

export const signUpValidation = {
    body: Joi.object({
        userName: Joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(/^[a-zA-Z0-9_ ]+$/) // Allow spaces in username
            .required()
            .messages({
                "any.required": "Username is required.",
                "string.empty": "Username cannot be empty.",
                "string.min": "Username is too short, must be at least {#limit} characters.",
                "string.max": "Username is too long, must be at most {#limit} characters.",
                "string.base": "Username must be a string.",
                "string.trim": "Username should not have leading or trailing spaces.",
                "string.pattern.base": "Username can only contain English letters, numbers, underscores, and spaces."
            }),

        email: Joi.string()
            .email()
            .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
            .required()
            .messages({
                "any.required": "Email is required.",
                "string.empty": "Email cannot be empty.",
                "string.email": "Email must be a valid email address.",
                "string.pattern.base": "Only Gmail addresses are allowed.",
                "string.base": "Email must be a string."
            }),

        password: Joi.string()
            .min(6)
            .max(30)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/) // Requires at least one letter and one number
            .required()
            .messages({
                "any.required": "Password is required.",
                "string.empty": "Password cannot be empty.",
                "string.min": "Password must be at least {#limit} characters long.",
                "string.max": "Password must not exceed {#limit} characters.",
                "string.pattern.base": "Password must contain at least one letter and one number.",
                "string.base": "Password must be a string."
            }),

        cPassword: Joi.string()
            .valid(Joi.ref("password"))
            .required()
            .messages({
                "any.required": "Confirm password is required.",
                "string.empty": "Confirm password cannot be empty.",
                "any.only": "Passwords do not match.",
                "string.base": "Confirm password must be a string."
            }),
    }).with("password", "cPassword")
};



export const loginValidation = {
    body: joi.object({
        email: joi.string()
            .email()
            .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
            .messages({
                "string.empty": "Email cannot be empty.",
                "string.email": "Email must be a valid email address.",
                "string.pattern.base": "Only Gmail addresses are allowed.",
                "string.base": "Email must be a string.",
                "any.invalid": "Invalid email format."
            }),
        password: joi.string()
            .min(6)
            .max(30)
            .required()
            .messages({
                "any.required": "Password is required.",
                "string.empty": "Password cannot be empty.",
                "string.min": "Password must be at least {#limit} characters long.",
                "string.max": "Password must not exceed {#limit} characters.",
                "string.base": "Password must be a string."
            }),
    }).or("userName", "email") // Either username or email must be provided
};
export const updateValidation = {
    body: joi.object({
        name: joi.string()
            .min(3)
            .max(50)
            .messages({
                "string.min": "Name must be at least {#limit} characters long.",
                "string.max": "Name must not exceed {#limit} characters.",
                "string.base": "Name must be a string."
            }),

        email: joi.string()
            .email()
            .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
            .messages({
                "string.email": "Email must be a valid email address.",
                "string.pattern.base": "Only Gmail addresses are allowed.",
                "string.base": "Email must be a string."
            }),

        password: joi.string()
            .min(6)
            .max(30)
            .allow("")
            .messages({
                "string.min": "Password must be at least {#limit} characters long.",
                "string.max": "Password must not exceed {#limit} characters.",
                "string.base": "Password must be a string."
            }),
    }).or("name", "email", "password") // 🛑 At least one field must be provided
};