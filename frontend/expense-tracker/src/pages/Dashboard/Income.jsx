import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import { useUserAuth } from '../../hooks/useUserAuth';
import DeleteAlert from '../../components/DeleteAlert';

const Income = () => {
  useUserAuth();
  const [ incomeData , setIncomeData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //Get All income Details
  const fetchIncomeData = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      console.log("Income Data Response: ", response.data);
      if (response.data) {
        setIncomeData(response.data); 
      }

    }catch(error){
      console.log("Something went wrong.Please try again. ", error);
    }finally{
      setLoading(false);
    }
  };

  //Handle Add Income
  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;
    //Validation
    if(!source.trim()){
      toast.error("Income source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than zero");
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }
    try{
      await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, {
        source: source.trim(),
        amount: Number(amount),
        date,
        icon: icon.trim(),
      });
      toast.success("Income added successfully");
      setOpenAddIncomeModal(false);
      fetchIncomeData();
    }catch(error){
      console.log("Something went wrong. Please try again. ", error);
      toast.error("Something went wrong. Please try again.");
    }

  };

  //Handle Delete Income
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully");
      fetchIncomeData();
    }catch(error){
      console.log(
        "Error deleting income:",
        error.response?.data?.message || error.message
      )
    }
  };

  //handle dowload income details
  const handleDownloadIncome = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,{
        responseType: 'blob',
      });

      //create URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.log("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again.");

    }
  };

  useEffect(() => {
    fetchIncomeData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview 
              transactions={incomeData}
              onAddIncome={()=>setOpenAddIncomeModal(true)}
            />
          </div>
          
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownload={handleDownloadIncome}
          />

        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >   
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show:false ,data: null})}
          title="Delete Income"
        >
          <DeleteAlert 
            content="Are you sure you want to delete this income?"
            onDelete={()=>deleteIncome(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income;
