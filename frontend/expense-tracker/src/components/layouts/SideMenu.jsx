import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { SIDE_MENU_DATA } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({activeMenu}) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();
  const handleClick = (route) => {
    if(route === "logout"){
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearUser();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">

    <div className="flex flex-col items-center justify-center gap-3 mt-5 mb-8">
      {user?.profileImageUrl ? (
        <img
        src={user?.profileImageUrl || ""}
        alt="Profile"
        className="w-25 h-25 rounded-full bg-slate-300 "
      />
    ): (
          <CharAvatar
            fullName={user?.fullName}
            width='w-20'
            height='h-20'
            style="text-xl"
          />
        )}

      <h5 className="text-[16px] font-semibold text-gray-900">
        {user?.fullName || ""}
      </h5>
    </div>


      {SIDE_MENU_DATA.map((item,index) => {
        return (
          <button 
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all
              ${activeMenu === item.label 
                ? "bg-[#845EEE] text-white font-medium shadow-sm" 
                : "text-gray-700 hover:bg-gray-100"
              }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon 
              className={`text-[20px]
                ${activeMenu === item.label ? "text-white" : "text-gray-700"}
              `}
            />
            {item.label}
          </button>
        );
      })}
    </div>
  )
}

export default SideMenu;
