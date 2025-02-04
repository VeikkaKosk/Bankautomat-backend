const connection = require('../controllers/db/database'); // database connection

// Promise wrapper for queries
const queryAsync = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// List Transactions
const listTransactions = async (account_id) => {
  const query = 'CALL list_transactions(?)';
  try {
    const results = await queryAsync(query, [account_id]);
    const rows = results[0]; // In case of stored procedures, the results might be wrapped in an array
    return rows;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; // Propagate error
  }
};

// Deposit
const deposit = async (account_id, amount, idatm, idcard) => {
  const query = 'CALL deposit(?, ?, ?, ?)';
  try {
    const results = await queryAsync(query, [account_id, amount, idatm, idcard]);
    return results[0];
  } catch (error) {
    console.error('Error depositing funds:', error);
    throw error; // Propagate error
  }
};

// Withdraw
const withdraw = async (account_id, amount, idatm, idcard) => {
  const query = 'CALL withdraw(?, ?, ?, ?)';
  try {
    const result = await queryAsync(query, [account_id, amount, idatm, idcard]);
    return result[0];
  } catch (error) {
    console.error('Error withdrawing funds:', error);
    throw error; // Propagate error
  }
};

// Transfer
const transfer = async (from_account, to_account, amount, idatm, idcard) => {
  const query = 'CALL transfer(?, ?, ?, ?, ?)';
  try {
    const result = await queryAsync(query, [from_account, to_account, amount, idatm, idcard]);
    return result[0];
  } catch (error) {
    console.error('Error transferring funds:', error);
    throw error; // Propagate error
  }
};

// Export the functions
module.exports = { 
  listTransactions, 
  deposit, 
  withdraw, 
  transfer 
};
/*
first we call all procedures with transactions here
this is listtransactions */
// List Transactions
/*const listTransactions = async (account_id) => {
  const query = 'CALL list_transactions(?)';
  const [rows] = connection.query(query, [account_id]); 
  return rows;
};

// Deposit
const deposit = async (account_id, amount, idatm, idcard) => {
  const query = `CALL deposit(?, ?, ?, ?)`;
  const [rows] = connection.query(query, [account_id, amount, idatm, idcard]); 
  return rows;
};

// Withdraw
const withdraw = async (account_id, amount, idatm, idcard) => {
  const query = `CALL withdraw(?, ?, ?, ?)`;
  const [rows] = connection.query(query, [account_id, amount, idatm, idcard]); 
  return rows;
};
// Transfer
const transfer = async (from_account, to_account, amount, idatm, idcard) => {
  const query = `CALL transfer(?, ?, ?, ?, ?)`;
  const [rows] = connection.query(query, [from_account, to_account, amount, idatm, idcard]);
  return rows;
};


*/


/* Function to process transactions by calling a stored procedure
function processTransaction(transType, fromAccount, toAccount, amount, atmId, cardId) {
  return new Promise((resolve, reject) => {
    const query = `CALL process_transaction(?, ?, ?, ?, ?, ?)`;
    console.log('Executing stored procedure with parameters:', [transType, fromAccount, toAccount, amount, atmId, cardId]); // Debugging

    connection.query(query, [transType, fromAccount, toAccount, amount, atmId, cardId], (error, results) => {
      if (error) {
        console.error('Error in processTransaction:', error.message);
        return reject(error);
      }
      console.log('Stored procedure results:', results); // Debugging
      resolve(results);
    });
  });
}



// Function to get the last 10 transactions of an account
function getLastTransactions(accountId, limit = 10) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM transaction
      WHERE account_id = ?
      ORDER BY trans_date DESC
      LIMIT ?;
    `;
    connection.query(query, [accountId, limit], (error, results) => {
      if (error) {
        console.error('Error in getLastTransactions:', error.message);
        return reject(error);
      }
      resolve(results); // Return the query results
    });
  });
}
*/


/*
if needed
processTransaction,
getLastTransactions,
processTransaction,*/