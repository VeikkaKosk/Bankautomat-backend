const connection = require('../controllers/db/database');

const AccountModel = {
  async getAccountBalance(accountId) {
    const query = `SELECT balance FROM account WHERE idaccount = ?`;
    const [rows] = await db.execute(query, [accountId]);
    return rows[0];
  },
  
  // Get account's credit limit by account ID
  async getLimit(accountId) {
    const query = `SELECT credit_limit FROM account WHERE id_account = ?`;
    const [rows] = await db.execute(query, [accountId]);
    return rows[0]?.credit_limit; // Return credit_limit if available
  },
  
  // Get account's credit limit by account ID
  async getLimit(accountId) {
    const query = `SELECT account_type FROM account WHERE id_account = ?`;
    const [rows] = await db.execute(query, [accountId]);
    return rows[0]?.account_type;  // Return type if available example debit, credit?
  },

};

module.exports = {
  AccountModel,
};
