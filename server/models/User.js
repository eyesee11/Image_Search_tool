const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
    enum: ["google", "facebook", "github"],
  },
  providerId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    sparse: true,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ provider: 1, providerId: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
