const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const incomeSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    title: { type: String , unique: true, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true},
    user: { type: String},
    branchId: { type: Number },
    lastEdit: {type : String}
});

incomeSchema.plugin(mongoosePaginate);

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
