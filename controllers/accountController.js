const Income = require("../models/income")
const Expense = require("../models/expense")
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRECT = "ewf98we789ew7v897vdcsc()EF*E(^FE"

module.exports.getIncome = async (req, res) => {
    try {
        const { branchId } = req.params;
        console.log(branchId);

        const { page = 1, limit = 10, search } = req.query; 

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };

        const query = { branchId: branchId };

        if (search) {
          const isNumeric = !isNaN(search);
    
          if (isNumeric) {
            query.amount = parseInt(search);
          } else {
            query.$or = [
              { title: { $regex: new RegExp(search, 'i') } },
              { description: { $regex: new RegExp(search, 'i') } },
            ];
          }
        }
        const incomes = await Income.paginate(query, options);
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getAllIncome = async (req, res) => {
    const income = await Income.find({}, { __v: 0 });
    res.send(income);
};

module.exports.getoneIncome = async (req, res) => {
    try {
        const { _id } = req.params
        const income = await Income.findById(req.params.id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.json(income);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.addIncome = async (req, res) => {
    const { id, date, title, description, amount, user, branchId, lastEdit } = req.body;
    console.log(title);

    Income.create({ id, date, title, description, amount, user, branchId, lastEdit })
        .then((data) => {
            console.log("Saved successfully");
            res.status(201).send(data);
        }).catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong" })
        })

};

module.exports.updateIncome = async (req, res) => {
    const { id } = req.params
    const { date, title, description, amount, lastEdit } = req.body;

    Income.findByIdAndUpdate(id, { date, title, description, amount, lastEdit }, { new: true })
        .then((data) => {
            console.log("Update successfully");
            res.status(201).send({ data, user });
        }).catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong" })
        })

};

module.exports.deleteIncome = async (req, res) => {
    const { id } = req.params
    const { user } = req.body

    Income.findByIdAndDelete(id)
        .then((data) => {
            console.log("Deleted successfully");
            res.status(201).send({ data, user });
        }).catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong" })
        })

};

module.exports.totalIncome = async (req, res) => {
    try {
        const totalIncome = await Income.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        const total = totalIncome.length > 0 ? totalIncome[0].total : 0;

        res.json({ total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};


module.exports.getExpense = async (req, res) => {
    try {
        const { branchId } = req.params;
        console.log(branchId);

        const expenses = await Expense.find({ branchId: branchId });

        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getAllExpense = async (req, res) => {
    const expense = await Expense.find({}, { __v: 0 });
    res.send(expense);
};

module.exports.addExpense = async (req, res) => {
    const { id, date, title, description, amount, user, branchId, lastEdit } = req.body;

    Expense.create({ id, date, title, description, amount, user, branchId, lastEdit })
        .then((data) => {
            console.log("Saved successfully");
            res.status(201).send(data);
        }).catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong" })
        })

};

module.exports.updateExpense = async (req, res) => {
    const { id } = req.params
    const { date, title, description, amount, lastEdit } = req.body;

    Expense.findByIdAndUpdate(id, { date, title, description, amount,lastEdit }, { new: true })
        .then((data) => {
            console.log("Update successfully");
            res.status(201).send({ data, user });
        }).catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong" })
        })

};

module.exports.deleteExpense = async (req, res) => {
    const { id } = req.params
    const { user } = req.body

    Expense.findByIdAndDelete(id)
        .then((data) => {
            console.log("Deleted successfully");
            res.status(201).send({ data, user });
        }).catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong" })
        })

};

module.exports.totalExpense = async (req, res) => {
    try {
        const totalExpense = await Expense.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        const total = totalExpense.length > 0 ? totalExpense[0].total : 0;

        res.json({ total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

module.exports.getoneExpense = async (req, res) => {
    try {
        const { _id } = req.params
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};