const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    title: { type: String , unique: true },
    description: { type: String },
    amount: { type: Number},
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
