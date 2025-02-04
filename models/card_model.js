const connection = require('../controllers/db/database');

const getCardByNumberAndPin = async (cardNumber, pin) => {
  const query = `
    SELECT c.*, a.*, cu.fname, cu.lname 
    FROM card c
    JOIN account a ON c.idaccount = a.idaccount
    JOIN customer cu ON a.idcustomer = cu.idcustomer
    WHERE c.card_number = ? AND c.pin = ?
  `;
  return new Promise((resolve, reject) => {
    connection.query(query, [cardNumber, pin], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]); // Palauta ensimmäinen tulos, muutetaan tämä myöhemmin.
    });
  });
};
/*
const bcrypt = require("bcrypt");
kryptattu pin coodi
bcrypt.hash()
*/
module.exports = {
  getCardByNumberAndPin,
};