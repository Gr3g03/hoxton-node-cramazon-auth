import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Products from './Products'

type Item = {
  id: number
  title: string
  image: string
  price: number
}

type Order = {
  id: number
  userId: number
  itemId: number
  item: Item
  quantity: number
}

type User = {
  id: number
  name: string
  email: string
  orders: Order[]
}

function App() {

  return (
    <>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='products' element={<Products />} />
      </Routes>
    </>
  )
}

export default App