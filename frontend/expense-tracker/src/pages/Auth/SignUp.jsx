import { useState , useContext }  from 'react'
import { validateEmail } from "../../utils/helper";
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from "../../components/Inputs/input";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from '../../utils/uploadImage';
import axiosInstance from "../../utils/axiosInstance";


const SignUp = () => {
  const [profilepic , setProfilePic] = useState('');
  const [fullName , setFullName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const { updateUser } = useContext(UserContext); 

  const [error , setError] = useState('');

  const navigate = useNavigate();

  //Handle Signup form submit
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    setError("");

    //Signup App Call
    try{
      let profileImageUrl = "";
      if(profilepic){
        const imageUploadRes = await uploadImage(profilepic);
        profileImageUrl = imageUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER , {
        fullName,
        email,
        password,
        profileImageUrl
      })
      const { token , user } = response.data;
      
      if(token){
        localStorage.setItem('token' , token);
        updateUser(user);
        navigate('/dashboard');
      }
    }catch(err){
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    
};


  return (
    <AuthLayout>
      <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us and start tracking your expenses
        </p>

        <form onSubmit={handleSignup}>

          <ProfilePhotoSelector image={profilepic} setImage={setProfilePic} />
          <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
            />
            <Input 
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder='example123@gmail.com'
            type='text'
          />

          <Input 
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder='Min 8 characters'
            type='password'
          />

          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button className='btn-primary' type='submit'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link className='font-medium text-violet-600 underline' to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
