const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST (create reservation)
router.post('/', async (req, res) => {
  // Extract the necessary data from the request body
  const { username, seminarName, finalCost, cardNumber } = req.body;

  // Create a new reservation object
  const reservationData = new Reservation({
    username: username,
    seminarName: seminarName,
    finalCost: finalCost,
    cardNumber: cardNumber,
  });

  try {
    // Save the reservation to the database
    const savedReservation = await reservationData.save();
    res.send(savedReservation);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// GET (retrieve all reservations)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.send(reservations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET (retrieve reservation by ID)
router.get('/:reservationId', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    res.send(reservation);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE (delete reservation by ID)
router.delete('/:reservationId', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.reservationId);
    res.send(deletedReservation);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
