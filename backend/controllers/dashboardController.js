const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//Dashboard Data
exports.dashboard = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //Fetch all income & expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        console.log("totalIncome",{ totalIncome, userId: isValidObjectId(userId) });

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        //Get income transaction in the last 60 days
        const incomeLast60IncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        //Get total income for the last 60 days
        const incomeLast60Days = incomeLast60IncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )

        //Get expense transaction for last 30 days
        const expenseLast30ExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        //Get total expense for the last 30 days
        const expenseLast30Days = expenseLast30ExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )

        //Fetch all 5 transactions (income + expense)
        const lastTransaction = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income"
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense"
                })
            ),
        ].sort((a, b) => b.date - a.date); //Sort latest first

        //Final response
        res.status(200).json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days,
                transactions: expenseLast30ExpenseTransaction
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: incomeLast60IncomeTransaction
            },
            recentTransactions: lastTransaction,
        });
    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
}