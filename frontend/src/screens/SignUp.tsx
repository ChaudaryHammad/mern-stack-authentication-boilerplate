



import { useState } from "react";
import InputField from "../components/Form/InputField";
import { Link } from "react-router-dom";


export function SignUp() {
const [signUpData,setSignUpData] = useState({
  name:"",
  email:"",
  password:""
})



  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]:e.target.value
    })
     
    
  };


  
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    console.log(signUpData);
   

    

    
  
    
  };



  return (
    <div className="h-screen w-full   relative flex flex-col items-center justify-center antialiased">
      
     <div>
     
<div className="min-w-[20rem] lg:w-[350px] lg:py-6 relative flex flex-col p-4 rounded-md text-black bg-white z-50">
  <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome to <span className="text-[#000]">RUNO</span></div>
  <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Sign Up here</div>
  <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

  <div className="block relative"> 
    
    <InputField label="Name" type="text" id="name" name="name" onChange={handleChange} />
   </div>

    <div className="block relative"> 
    
     <InputField label="Email" type="email" id="email" name="email" onChange={handleChange} />
    </div>
    <div className="block relative"> 
     <InputField label="Password" type="password" id="password" name="password" onChange={handleChange} />
      
    </div>
    {/* <div>
      <a className="text-sm text-[#7747ff]" href="#">Forgot your password?
      </a></div> */}
    <button type="submit" className="bg-black hover:bg-gray-900 active:bg-black w-max m-auto px-6 py-3 mt-1  transition-colors rounded text-white text-sm font-normal">Sign Up</button>
  </form>
  <div className="text-sm text-center mt-[1.6rem]">Already have an account? <Link className="text-sm text-[#7747ff]" to="/login">Login</Link></div>
</div>



     </div>
    
    </div>
  );
}
