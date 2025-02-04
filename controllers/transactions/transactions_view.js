const { getLastTransactions } = require('../../models/transaction_model');

// Function to display the last 10 transactions for an account
async function displayLastTransactions(accountId) {
    try {
      const transactions = await getLastTransactions(accountId);
      if (transactions.length > 0) {
        console.log(`Last 10 transactions for account ${accountId}:`);
        transactions.forEach((transaction, index) => {
          console.log(`${index + 1}. Transaction ID: ${transaction.idtrans}, Amount: ${transaction.trans_amount}, Type: ${transaction.trans_type}, Date: ${transaction.trans_date}`);
        });
      } else {
        console.log('No transactions found for this account.');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  }
  
  // Function to log transactions to morgan or etc (optional)

  module.exports = {
    displayLastTransactions,
  };