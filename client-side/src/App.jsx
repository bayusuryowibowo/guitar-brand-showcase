import { useEffect, useState } from 'react'
// import './App.css'
import Navbar from './components/Navbar'

const baseUrl = 'http://localhost:3000'

function App() {
  const [products, setProducts] = useState([])
  const fetchProductData = async () => {
    const response = await fetch(baseUrl + '/products', {
      method: "GET"
    })
    const products = await response.json()
    console.log(products)
  }

  useEffect(() => {
    console.log("useEffect jalan")
    fetchProductData()
  })

  return (
    <>
      <Navbar className="flex justify-center fixed w-full z-20 top-0 left-0 bg-blue-500 dark:bg-black shadow-md border-b border-gray-400 dark:border-slate-500"/>

    </>
  )
}

export default App
