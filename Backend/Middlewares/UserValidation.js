const Joi =require( "joi");

// Define Joi validation schema
const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be a type of text",
    "string.empty": "Username cannot be empty",
    "string.min": "Username should have a minimum length of {#limit}",
    "string.max": "Username should have a maximum length of {#limit}",
    "any.required": "Username is a required field",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "any.required": "Email is a required field",
  }),

  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of {#limit}",
    "any.required": "Password is a required field",
  }),

  isAdmin: Joi.boolean().default(false).messages({
    "boolean.base": "isAdmin should be a boolean value",
  }),
});

// Validate function
const validateUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      // Collect all error messages
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }
    // Proceed if validation passes
    next();
  };

module.exports= validateUser;
