const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Helper to return safe user payload
userSchema.methods.toSafeJSON = function () {
  return { id: this._id.toString(), email: this.email };
};

module.exports = mongoose.model("User", userSchema);