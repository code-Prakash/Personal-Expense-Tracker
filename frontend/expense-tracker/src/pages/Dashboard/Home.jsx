import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import InfoCard from '../../components/Cards/InfoCard'
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { addThousandsSeparators } from '../../utils/helper'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/Dashboard/RecentIncome'

const Home = () => {
  useUserAuth();

  const Navigate = useNavigate();

  const [dashboardData , setDashboardData] = useState(null);
  const [loading , setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if(response.data){
        setDashboardData(response.data);
      }


    }catch(error){
      console.log("Error fetching dashboard data: ", error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
    return () => {}
  },[]);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            icon={<IoMdCard/>}
            label="Total Balance"
            value={addThousandsSeparators(dashboardData?.totalBalance || 0)}
            color="bg-violet-600"
          />
          <InfoCard 
            icon={<LuWalletMinimal/>}
            label="Total Income"
            value={addThousandsSeparators(dashboardData?.totalIncome || 0)}
            color="bg-orange-600"
          />
          <InfoCard 
            icon={<LuHandCoins/>}
            label="Total Expense"
            value={addThousandsSeparators(dashboardData?.totalExpense || 0)}
            color="bg-red-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            OnSeeMore={() => Navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0} 
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpense?.transactions || []}
            OnSeeMore={() => Navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpense?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            OnSeeMore={() => Navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
