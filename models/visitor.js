const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    fields: { type: mongoose.Schema.Types.Mixed, default: null },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    coins: { type: Number, default: 100 },
    status: { type: String, default: "pending" },
    mobile: { type: String, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("visitor", schema);
