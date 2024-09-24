import {createTransaction, getAllTransactions, getTransactionHistory, deleteTransaction} from '../services/transaction.js';

export const createTransactionByUser = async (req, res) => {
    try {
    const result = await createTransaction(req.body, req.user.payload.userId);
    res.status(result.status ? 201 : 400).send(result);
  } catch (error) {
    res.status(500).send({ status: false, message: 'Internal server error' });
  }
};

export const getTransactionHistoryByUser = async (req, res) => {
    const userId =  req.user.payload.userId;
      try {
    const { page, limit } = req.query;
    const result = await getTransactionHistory(userId, page, limit);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ status: false, message: 'Internal server error' });
  }}

  
  export const getAllTransactionsByUser = async (req, res) => {
    const userId =  req.user.payload.userId;
    try {
        const { page, limit } = req.query;
      const result = await getAllTransactions(page, limit, userId);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ status: false, message: 'Internal server error' });
    }
  };

  export const deleteTransactionByUser = async (req, res) => {
    try {
      const transactionId = req.params.id;
      const result = await deleteTransaction(transactionId, req.user.payload.userId);
      res.status(result.status ? 200 : 404).send(result);
    } catch (error) {
      res.status(500).send({ status: false, message: 'Internal server error' });
    }}

