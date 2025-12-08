import card2 from '../../assets/images/card2.png';
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({children}) => {
  return (
  <div className='flex h-screen'>
    <div className='w-full md:w-[60vw] h-full flex flex-col px-8 md:px-12 pt-8 pb-12 overflow-y-auto'>
      <h2 className='text-2xl font-bold text-gray-900 mb-8'>Expense Tracker</h2>
      {children}
    </div>

    <div className='hidden md:flex md:w-[40vw] h-full bg-linear-to-br from-violet-50 to-purple-100 items-center justify-center p-8 relative overflow-hidden'>
      <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 opacity-90'/>
      <div className='w-48 h-56 rounded-[40px] border-20 border-fuchsia-600 absolute top-[30%] -right-10 opacity-80'/>
      <div className='w-48 h-48 rounded-[40px] bg-violet-600 absolute -bottom-7 -left-5 opacity-90'/>

      <div className='absolute top-12 left-8 right-8 z-20'>
         <StatsInfoCard
           icon={<LuTrendingUpDown/>}
           label="Track Your Income & Expenses"
           value="1,50,000"
           color="bg-purple-600"
          />
      </div>

      <img 
        src={card2}
        alt="Card decoration"
        className='absolute left-8 right-8 rounded-[20px] z-10 shadow-2xl transition-transform duration-300 w-auto max-h-90 bottom-8'
      />
    </div>
  </div>
  )
}

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-100/10 border border-gray-200/50 z-10 w-full">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
       <h6 className='text-xs text-gray-500 mb-1 '>{label}</h6>
       <span className='text-[20px]'>₹{value}</span>
    </div>
    </div>
  );
};
