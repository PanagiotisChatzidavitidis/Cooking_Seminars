const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema(
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
    },
    cardType: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false },
);



module.exports = mongoose.model('reservations', ReservationSchema);
