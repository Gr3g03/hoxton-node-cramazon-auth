import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Header from './Header'

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Navigate replace to="/home" />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App