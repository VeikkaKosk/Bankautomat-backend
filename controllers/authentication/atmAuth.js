const jwt = require('jsonwebtoken');
const cardModel = require('../../models/card_model');
const atmModel = require('../../models/atm');

const login = async (req, res) => {
console.log('Login request received:', req.params, req.body);
  const { serialNumber } = req.params;
  const { cardNumber, pin } = req.body;

  try {
    // Tarkista, onko ATM olemassa
    const atm = await atmModel.getATMBySerialNumber(serialNumber);
    console.log('ATM:', atm); // Debug-tuloste
    if (!atm) {
      return res.status(404).json({ message: 'ATM not found' });
    }

    // Hae kortin tiedot
    const card = await cardModel.getCardByNumberAndPin(cardNumber, pin);
    console.log('Card:', card); // Debug-tuloste
    if (!card) {
      return res.status(401).json({ message: 'Invalid card number or PIN' });
    }

    // Generoi token
    const token = jwt.sign({ cardNumber }, process.env.JWT_SECRET, {
      expiresIn: '5m', // Token vanhenee 5 minuutin kuluttua
    });

    // Palauta token ja kortin tiedot
    res.status(200).json({
      token,
      card: {
        cardNumber: card.card_number,
        cardType: card.card_type,
        account: {
          accountNumber: card.account_number,
          balance: card.balance,
          currency: card.currency_type,
        },
        customer: {
          firstName: card.fname,
          lastName: card.lname,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};