import React from 'react'
import Navbar from './components/Navbar' // Assuming Navbar is a component in your project
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Navbar /> 
    <Routes>
      <Route  path="/" element={<h1>Home Page</h1>} />
      <Route  path="/signup" element={<h1>signup Page</h1>} />
      <Route  path="/login" element={<h1>Login Page</h1>} />
      <Route  path="/settings" element={<h1>settings Page</h1>} />
      <Route  path="/profile" element={<h1>profile Page</h1>} />
    </Routes> 
    </div>
    // Assuming navbar is a component that renders the navigation bar 
  )
}

export default App