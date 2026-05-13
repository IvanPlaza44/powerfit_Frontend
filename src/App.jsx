import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Favorites } from './views/Favorites';
import { CardList }from "./views/CardList"
import { DetailProduct } from "./views/DetailProduct"
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
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/cart_list' element={<CardList/>}/>
        <Route path='/detail_product' element={<DetailProduct/>}/>
      </Routes>
      
      <Footer/>

    </div>
  )
}

export default App
