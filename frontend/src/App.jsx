import { useState } from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import { fetchApi } from './utils/apiConfig';

import HomePage from "./pages/home/HomePage.jsx"
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx"
import LoginPage from './pages/auth/login/LoginPage.jsx'
import Sidebar from './components/common/Sidebar.jsx'
import RightPanel from './components/common/RightPanel.jsx'
import NotificationPage from './pages/notification/NotificationPage.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'

import{Toaster}from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner.jsx'

function App() {
  const {data:authUser,isLoading,isError,error} = useQuery({
    queryKey: ["authUser"],
    queryFn: async()=>{
      try {
        console.log("Fetching auth user data...");

        const res = await fetchApi("/auth/me")
        console.log("Auth response status:", res.status);

        if (res.status === 401 || res.status === 403) {
          console.log("User not authenticated");
          return null; // Return null for unauthorized rather than throwing
        }

        // Handle other error responses
        if (!res.ok) {
          // Try to get error details, but don't break if JSON parsing fails
          const errorData = await res.json().catch(() => ({}));
          console.error("Error response:", errorData);
          throw new Error(errorData.error || "Something went wrong");
        }
        

        // Parse successful response
        const data = await res.json();
        console.log("Auth user data received:", data);
        return data;
      } catch (error) {
        console.error("Auth query error:", error.message);
        throw error;
      }
    },
    retry: false, // Don't retry failed auth requests
    staleTime: 300000, // 5 minutes
  })
  if(isLoading){
    return(
      <div className='loaderContainer'>
        <LoadingSpinner size={"lg"}/>
      </div>
    )
  }
  return (
      <div className='app'>
        {authUser && <Sidebar />}
        <Routes>
          <Route path='/' element={authUser ? <HomePage />: <Navigate to={"/login"} />} />
          <Route path='/login' element={!authUser ? <LoginPage /> :<Navigate to={"/"} /> } />
          <Route path='/signup' element={!authUser ? <SignUpPage />: <Navigate to={"/"} />} />
          <Route path='/notifications' element={authUser ?<NotificationPage />: <Navigate to={"/login"} />} />
          <Route path='/profile/:username' element={authUser ?<ProfilePage />: <Navigate to={"/login"} />} />
        </Routes>
        {authUser&& <RightPanel />}
        <Toaster />
      </div>

  )
}

export default App
