/*
add all additonal procedures here?
*/

/*
saved just in case if needed

// Close Account delete
const closeAccount = async (account_id) => {
    const query = `CALL close_account(?)`;
    const [rows] = await db.query(query, [account_id]);
    return rows;
};

// Create Account
const createAccount = async (account_number, account_type, iban, credit_limit, currency_id, idcustomer) => {
    const query = `CALL create_account(?, ?, ?, ?, ?, ?, @p_result)`;
    const [rows] = await db.query(query, [account_number, account_type, iban, credit_limit, currency_id, idcustomer]);
    return rows;
};
*/