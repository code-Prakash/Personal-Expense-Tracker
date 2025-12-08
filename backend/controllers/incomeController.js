const Income = require("../models/Income");
const xlsx = require("xlsx");


//Add income Sourse
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try{
        const{ icon , source, amount, date} = req.body;

        //Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);

    }catch(err){
        res.status(500).json({ message: "Error adding income",error:err.message });
    }

}

//Get all income sourse
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        res.status(200).json(income);

    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
}

//Delete income
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });

    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
}

//Download excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        //Prepared data for excel 
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.status(200).download("income_details.xlsx");
    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
}
