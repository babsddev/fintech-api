import Joi from 'joi';

export const transactionSchema = Joi.object({
  amount: Joi.number().positive().required(),
  recipient_account_number: Joi.string().required(), 
  sender_account_number: Joi.string().required(), 
  description: Joi.string().max(255).optional(), // Optional description, max length of 255 characters
});