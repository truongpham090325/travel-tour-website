const mongoose = require("mongoose");

const City = mongoose.model(
  "City",
  {
    name: String,
  },
  "cities"
);

module.exports = City;
