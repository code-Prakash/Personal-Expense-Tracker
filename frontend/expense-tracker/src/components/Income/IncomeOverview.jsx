import { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import { preparedIncomeBarChartData } from '../../utils/helper';
import CustomIncomeBarChart from '../Charts/CustomIncomeBarChart.jsx';

const IncomeOverview = ({transactions,onAddIncome}) => {
  const [chartData , setChartData] = useState([]);

  useEffect(() => {
    console.log("Transactions in Income Overview: ", transactions);
    const result = preparedIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);


  return (<div className="card">
      <div className="flex items-center justify-between">
        <div className="">
           <h5 className="text-lg">Income Overview</h5>
           <p className="text-xs text-gray-400 mt-0.5">Track you earnings overtime  and analyse your income trends.</p> 
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomIncomeBarChart data={chartData}/>
      </div>

    </div>
  )
}

export default IncomeOverview
