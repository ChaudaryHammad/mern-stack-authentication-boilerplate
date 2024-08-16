import React from 'react'
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { SignUp } from './screens/SignUp'
import {Login} from './screens/Login'
import HomePage from './screens/HomePage'
import GridBackground from './components/ui/GridBackground.tsx'
import { Link } from 'react-router-dom'

const  App:React.FC = ()=> {
  const authenticated = false
  const NotAuthorized = (
 
  
    <div className='text-white bg-black h-screen w-full flex-col flex items-center justify-center'>
    <h1 className='text-3xl font-bold  leading-10'>You are not Authorized</h1>
  
    <Link to={'/signup'} style={{ textDecoration: 'none', color: '#007bff' }}>Create account to continue</Link>
    </div>
  
  )


  const NotFound = (
 
  
    <div className='text-white bg-black  bg-grid-white/[0.2]  h-screen w-full flex-col flex items-center justify-center'>
    <div className='text-center'>
			<div className='absolute pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

    <h1 className='text-6xl font-mono'>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <p>
      It might have been moved or deleted. Please check the URL or return to the homepage.
    </p>
    <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
    Take me home
    </Link>
  </div>
  
    
    </div>
  
  )
  return (
    
   <>
   
   <Router>
      <Routes>
      <Route path="/" element={authenticated ? <HomePage /> : NotAuthorized} />
      <Route path="/signup" element={<GridBackground><SignUp /></GridBackground>} />
      <Route path="/login" element={<GridBackground><Login /></GridBackground>} />
      <Route path="*" element={NotFound} />

      </Routes>
    </Router>
   
   </>
    
    
  )
}

export default App