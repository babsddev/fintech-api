import mongoose from "mongoose"; 

const transaction = new mongoose.Schema({
  transaction_id: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  recipient_account_number: { type: String, required: true },
  sender_account_number: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transaction);


export default Transaction;
