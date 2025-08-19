import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter here

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react'; // Import the Loader component

const App = () => {
  const { authUser, checkAuth, ischeckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();  // Check authentication when component mounts
  }, [checkAuth]);

  console.log({ authUser });

  // If authentication is still checking and no user is found, show a loading spinner
  if (ischeckingAuth && authUser === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />  {/* Adjust size */}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* HomePage should only be accessible if the user is authenticated */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        
        {/* Redirect authenticated users from login and signup pages */}
        <Route path="/signup" element={ <SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Settings and Profile pages should only be accessible when authenticated */}
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
