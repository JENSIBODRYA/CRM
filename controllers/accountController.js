const Income=require("../models/income")
const Expense=require("../models/expense")

module.exports.getIncome=async(req,res)=>{
    const income=await Income.find({}, { __v: 0 });
    res.send(income);
};

module.exports.getoneIncome=async(req,res)=>{
    try {
        const {_id}=req.params
        const income = await Income.findById(req.params.id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.json(income);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.addIncome=async(req,res)=>{
    const {id,date,title,description,amount}=req.body;
    console.log(title);
    
    Income.create({id,date,title,description,amount})
    .then((data)=>{
        console.log("Saved successfully");
        res.status(201).send(data);
    }).catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong"})
    })
    
};

module.exports.updateIncome=async(req,res)=>{
    const {id}=req.params
    const {date,title,description,amount}=req.body;

    Income.findByIdAndUpdate(id,{date,title,description,amount})
    .then((data)=>{
        console.log("Update successfully");
        res.status(201).send(data);
    }).catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong"})
    })
    
};

module.exports.deleteIncome=async(req,res)=>{
    const {id}=req.params

    Income.findByIdAndDelete(id)
    .then((data)=>{
        console.log("Deleted successfully");
        res.status(201).send(data);
    }).catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong"})
    })
    
};

module.exports.totalIncome=async(req,res)=>{
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


module.exports.getExpense=async(req,res)=>{
    const expense=await Expense.find({}, { __v: 0 });
    res.send(expense);
};

module.exports.addExpense=async(req,res)=>{
    const {id,date,title,description,amount}=req.body;

    Expense.create({id,date,title,description,amount})
    .then((data)=>{
        console.log("Saved successfully");
        res.status(201).send(data);
    }).catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong"})
    })
    
};

module.exports.updateExpense=async(req,res)=>{
    const {id}=req.params
    const {date,title,description,amount}=req.body;

    Expense.findByIdAndUpdate(id,{date,title,description,amount})
    .then((data)=>{
        console.log("Update successfully");
        res.status(201).send(data);
    }).catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong"})
    })
    
};

module.exports.deleteExpense=async(req,res)=>{
    const {id}=req.params

    Expense.findByIdAndDelete(id)
    .then((data)=>{
        console.log("Deleted successfully");
        res.status(201).send(data);
    }).catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong"})
    })
    
};

module.exports.totalExpense=async(req,res)=>{
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

module.exports.getoneExpense=async(req,res)=>{
    try {
        const {_id}=req.params
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};