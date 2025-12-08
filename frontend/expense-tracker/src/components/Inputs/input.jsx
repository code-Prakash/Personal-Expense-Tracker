import { useState } from "react";
import { FaRegEye , FaRegEyeSlash} from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 font-medium">
        {label}
      </label>

      <div className="input-box flex items-center border rounded-md px-3 py-2 mt-1">
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          <>
          {showPassword ? (
            <FaRegEye 
              size={22}
              className="text-primary cursor-pointer" 
              onClick={toggleShowPassword}
            />
           ) : (
            <FaRegEyeSlash
              size={22}
              className="text-gray-500 cursor-pointer" 
              onClick={toggleShowPassword} />
          )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
