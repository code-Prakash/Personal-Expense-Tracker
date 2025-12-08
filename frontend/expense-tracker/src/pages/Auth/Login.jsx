import { useState,useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from '../../context/userContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    setError('');

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      console.log("LOGIN RESPONSE:", response.data);
      const { token , user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }
    catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] md:h-full flex flex-col justify-center'>
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className='text-xs text-gray-700 mt-2 mb-6'>
          Please Enter your details to login
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder='example123@gmail.com'
            type='text'
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder='Min 8 characters'
            type='password'
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button className='btn-primary' type='submit'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link className='font-medium text-violet-600 underline' to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login;
