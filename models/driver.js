const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, default:"" },
  email: { type: String, default:""},
  password: { type: String, default:"" },
  mobile: { type: String, default:"" },
  licenceNo: { type: String, default: "" },
  vehicleNo: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Driver", Schema);
