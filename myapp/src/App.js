import React, { useContext, useEffect, useState } from 'react'
import Card from './Components/Card'
import View from './Components/View'
import Delete from './Components/Delete'
import { BrowserRouter,Routes,Route, useParams } from 'react-router-dom'
import ProductForm from './Components/ProductForm'
import Navbar from './Components/Navbar'
import { ProductContext } from './Components/ProductContext'
import SearchComponent, { SearchContext } from './Components/SearchComponent'
import Axios from 'axios'
import AddCart from './Components/AddCart'

function App() {
  const [myData,setmyData] = useState("")
const api = process.env.REACT_APP_API_URL;
console.log(api)
 useEffect(()=>{
        const fetchData = async () => {
            try{
                const output = await Axios.get(`${api}/api/products`)
                setmyData(output.data)
                console.log(output.data)
                
            }
            catch(e){
                console.log(e)
            }
        }
        fetchData()
    },[])
  return (
    
    <BrowserRouter>
   <ProductContext.Provider value={myData}>
   <SearchComponent>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Card/>}></Route>
      <Route path='/api/products' element={<ProductForm/>}></Route>
      <Route path='/product/:pNo' element={<View/>}></Route>
      <Route path='/api/products/:pNo' element={<Delete/>}></Route>   
      <Route path='/add/cart/:pNo' element={<AddCart/>}></Route>                 
    </Routes>
      </SearchComponent>

   </ProductContext.Provider>
    </BrowserRouter>
  )
}

export default App