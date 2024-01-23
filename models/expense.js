const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    title: { type: String, required: true , unique: true },
    description: { type: String },
    amount: { type: Number, required: true },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
