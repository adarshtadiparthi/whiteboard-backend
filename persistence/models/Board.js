const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shared: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    elements: [{ type: mongoose.Schema.Types.Mixed }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Board", BoardSchema);
