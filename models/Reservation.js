const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    seminarName: {
      type: String,
      required: true,
    },
    finalCost: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true, versionKey: false },
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
