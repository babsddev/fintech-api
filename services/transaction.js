import Transaction from '../models/transaction.js';
import { generateUUID } from '../helpers/uuidGenerator.js';

export const createTransaction = async ({ amount, recipient_account_number, sender_account_number, description }, userId) => {
  const transaction = new Transaction({
    transaction_id: generateUUID(),
    amount,
    recipient_account_number,
    sender_account_number,
    description,
    user: userId,
  });

  try {
    await transaction.save();
    return { status: true, data: transaction };
  } catch (err) {
    return { status: false, message: err.message };
  }
};

export const getTransactionHistory = async (userId, page = 1, limit = 10) => {
    console.log(userId, "UKKKK")
  const transactions = await Transaction.find({ user: userId })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  return { status: true, data: transactions };
};

export const getAllTransactions = async (page = 1, limit = 10) => {
    try {
      const transactions = await Transaction.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
      return { status: true, data: transactions };
    } catch (err) {
      return { status: false, message: err.message };
    }
  };


export const deleteTransaction = async (transactionId, userId) => {
    const transaction = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });
    if (!transaction) {
      return { status: false, message: 'Transaction not found or does not belong to the user.' };
    }
    return { status: true, message: 'Transaction deleted successfully.' };
  };
