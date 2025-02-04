const atmModel = require('../../models/atm');


// Funktio, joka tarkistaa onko ATM:n sarjanumero rekisteröity
const checkATMSerialNumber = (req, res) => {
  const { serialNumber } = req.params;

  // Kutsu models/atm.js funktiota
  atmModel.getATMBySerialNumber(serialNumber, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: 'ATM serial number is registered', atm: results[0] });
    } else {
      return res.status(404).json({ message: 'ATM serial number is not registered' });
    }
  });
};

module.exports = {
  checkATMSerialNumber
};