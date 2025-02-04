const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authentication/atmAuth');
const authMiddleware = require('../controllers/authentication/authMiddleware');

// Reitti kirjautumista varten
router.post('/:serialNumber/login', login);

// Suojattu reitti (vaatii tokenin)
router.get('/:serialNumber/account', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

module.exports = router;