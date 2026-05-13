import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
//import Form from './components/react/Form'
// import PostList from './components/react/Promises/PostList'



function App() {

  return (
    <div>

      <NavBar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      
      <Footer/>

    </div>
  )
}

export default App
