import * as Joi from "joi";

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  PORT: Joi.number().default(3000),
  REVOLUT_API_URL: Joi.string().uri(),
  STERLINGBANK_API_URL: Joi.string().uri(),
  MONZO_API_URL: Joi.string().uri(),
});
