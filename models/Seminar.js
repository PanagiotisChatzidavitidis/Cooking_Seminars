const mongoose = require('mongoose');

const SeminarSchema = mongoose.Schema(
  {
    seminar_name: {
      type: String,
      required: true
    },
    seminar_date_end: {
      type: Date,
      required: true
    },
    seminar_date_start: {
      type: Date,
      required: true
    },
    seminar_description: {
      type: String,
      required: true
    },
    seminar_duration: {
      type: Number,
      required: true
    },
    seminar_capacity: {
      type: Number,
      default: 50
    }
  },
  {
    versionKey: false // Disable the versionKey field
  }
);

module.exports = mongoose.model('seminars', SeminarSchema);
