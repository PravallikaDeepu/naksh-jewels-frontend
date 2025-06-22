import Axios  from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Delete() {
  const {pNo} = useParams()
  const navigate = useNavigate()
  useEffect(()=>
  {
    const fetchData = (async ()=>{
      try{
        const output = await Axios.delete(`http://localhost:8070/api/products/${pNo}`)
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