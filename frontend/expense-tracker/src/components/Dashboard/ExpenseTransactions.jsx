import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/transactionInfoCard";

const ExpenseTransactions = ({transactions , OnSeeMore}) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expenses</h5>

            <button className="card-btn" onClick={OnSeeMore}>
                See All <LuArrowRight className="text-base"/>
            </button>
        </div>
        <div className="mt-6">
          {transactions?.slice(0,4)?.map((expense)=>(
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD-MM-YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))}
        </div>
    </div>
  )
}

export default ExpenseTransactions;
