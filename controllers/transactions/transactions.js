const { transfer , withdraw, deposit, listTransactions } = require('../../models/transaction_model');

// deposithandler function
const depositHandler = async (req, res) => {
  try {
      const { account_id, amount, idatm, idcard } = req.body;
      const result = await deposit(account_id, amount, idatm, idcard);
      res.status(200).json({ message: 'Deposit successful', data: result });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Withdraw handler
const withdrawHandler = async (req, res) => {
  try {
    const { account_id, amount, idatm, idcard } = req.body;
    const result = await withdraw(account_id, amount, idatm, idcard);
    res.status(200).json({ message: 'Withdraw successful', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// transfer handler
const transferHandler = async (req, res) => {
  try {
      const { from_account, to_account, amount, idatm, idcard } = req.body;
      const result = await transfer(from_account, to_account, amount, idatm, idcard);
      return result; // Return result instead of sending a response here
      //  res.status(200).json({ message: 'Transfer successful', data: result });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// list transactions functio
const listTransactionsHandler = async (req, res) => {
  try {
      const { account_id } = req.params;
      const transactions = await listTransactions(account_id);
      if (!transactions || transactions.length === 0) {
        return [];  // Return an empty array if no transactions are found
      }
      if (!transactions) {
        return res.status(404).json({ message: 'No transactions found' });
      }
      res.status(200).json({message:'listing transactions',data: transactions});
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  depositHandler,
  withdrawHandler,
  transferHandler,
  listTransactionsHandler,
};

/* if needed
// Handles transaction requests
async function handleTransaction(req, res) {
  const { transType, fromAccount, toAccount, amount, atmId, cardId } = req.body;

  // Input validation
  if (!transType || !fromAccount || !toAccount || !amount || !atmId || !cardId) {
    console.log('transaction:', transaction); // Debug-tuloste
    return res.status(400).json({
      message: 'Missing required fields. Please provide all necessary transaction details.',
    });
  }
  // invalid transaction type must be 1,2 or 3
  if (![1, 2, 3].includes(transType)) {
    console.log('transaction:', transaction); // Debug-tuloste
    return res.status(400).json({
      message: 'Invalid transaction type. Must be 1 (deposit), 2 (withdrawal), or 3 (transfer).',
    });
  }
  //requires account only when transferring
  if (transType === 3 && !toAccount) {
    console.log('transaction:', transaction); // Debug-tuloste
    return res.status(400).json({
      message: 'Transfer transactions require a valid target account (toAccount).',
    });
  }
  
  // not enough funds error
  if (isNaN(amount) || amount <= 0) {
    console.log('transaction:', transaction); // Debug-tuloste
    return res.status(400).json({
      message: 'Invalid amount. Please provide a positive number.',
    });
  }

  try {
    // Calls the processTransaction function in the database
    const result = await processTransaction(transType, fromAccount, toAccount, amount, atmId, cardId);
    console.log('Transaction processed successfully:', result);
    
    res.status(200).json({
      message: 'Transaction processed successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error in handleTransaction:', error.message);

    // Server-side error handling
    res.status(500).json({
      message: 'Transaction failed due to server error',
      error: error.message,
    });
  }
}
*/


