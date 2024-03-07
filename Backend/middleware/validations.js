const Joi = require('joi');

// schema and middleware for signup
const signupSchema = Joi.object({
  name: Joi.string().required(),
  mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
  password: Joi.string().min(6).required(),
  balance: Joi.number().optional()
});

exports.validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// schema and middleware for signin
const signinSchema = Joi.object({
  mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
  password: Joi.string().required()
});

exports.validateSignin = (req, res, next) => {
  const { error } = signinSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// schema and middleware for deposit
const depositSchema = Joi.object({
  amount: Joi.number().required()
});

exports.validateDeposit = (req, res, next) => {
  const { error } = depositSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// similar to deposit schema
const withdrawSchema = Joi.object({
  amount: Joi.number().required()
});

exports.validateWithdraw = (req, res, next) => {
  const { error } = withdrawSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// schema and middleware for transfer
const transferSchema = Joi.object({
  recipientMobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
  amount: Joi.number().required()
});

exports.validateTransfer = (req, res, next) => {
  const { error } = transferSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};