import Axios  from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Delete() {
  const {pNo} = useParams()
  const navigate = useNavigate()
  const api = process.env.REACT_APP_API_URL;

  useEffect(()=>
  {
    const fetchData = (async ()=>{
      try{
        const output = await Axios.delete(`${api}/api/products/${pNo}`)
       navigate("/")

      }
      catch(e)
      {
        console.log(e)
      }
    })
    fetchData()
  },[pNo])
  return (
   
    <div>
  <h1>Delete : {pNo}</h1>
    </div>
  )
}

export default Delete