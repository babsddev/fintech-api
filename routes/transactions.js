import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createTransactionByUser, getTransactionHistoryByUser, deleteTransactionByUser, getAllTransactionsByUser } from '../controllers/transaction.js';

const router = express.Router();

router.post('/', authMiddleware, createTransactionByUser);
router.get('/', authMiddleware, getTransactionHistoryByUser);
router.get('/all', authMiddleware, getAllTransactionsByUser); 
router.delete('/:id', authMiddleware, deleteTransactionByUser)


export default router;
