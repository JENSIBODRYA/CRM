const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    title: { type: String, required: true , unique: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: String},
    branchId: { type: Number },
    lastEdit: {type : String}
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
