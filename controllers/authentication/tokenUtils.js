const jwt = require('jsonwebtoken');

const generateToken = (cardNumber) => {
  return jwt.sign({ cardNumber }, process.env.JWT_SECRET, {
    expiresIn: '5m', // Tokeni vanhenee 5 minuutin kuluttua, toki clientissä on omat timeoutit, jotka ovat lyhyemmät.
  });
};

module.exports = {
  generateToken,
};