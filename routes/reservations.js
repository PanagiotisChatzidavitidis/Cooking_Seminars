const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST (create reservation)
router.post('/', async (req, res) => {
  const { username, seminarName, finalCost, cardNumber, Type, Quantity } = req.body;
  const censoredCardNumber = censorCardNumber(cardNumber);

  // Create a new reservation object
  const reservationData = new Reservation({
    username: username,
    seminarName: seminarName,
    finalCost: finalCost,
    cardNumber: censoredCardNumber,
    Type: Type,
    Quantity: Quantity,
  });

  try {
    // Save the reservation to the database
    const savedReservation = await reservationData.save();
    res.send(savedReservation);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// GET (get reservations by username)
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Find reservations by username
    const reservations = await Reservation.find({ username: username });
    res.send(reservations);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Function to censor the first 12 digits of the card number
function censorCardNumber(cardNumber) {
  const censoredDigits = '*'.repeat(12);
  const censoredCardNumber = censoredDigits + cardNumber.substring(12);
  return censoredCardNumber;
}

module.exports = router;
