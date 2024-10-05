import Joi from "joi";

// Schema untuk login
const loginSchema = Joi.object({
  code: Joi.string().required().messages({
    "any.required": "Kode harus diisi.",
  }),
  name: Joi.string().required().messages({
    "any.required": "Nama harus diisi.",
  }),
});

// Schema untuk registrasi
const registerSchema = Joi.object({
  code: Joi.string().required().messages({
    "any.required": "Kode harus diisi.",
  }),
  name: Joi.string().required().messages({
    "any.required": "Nama harus diisi.",
  }),
});

export { loginSchema, registerSchema };
