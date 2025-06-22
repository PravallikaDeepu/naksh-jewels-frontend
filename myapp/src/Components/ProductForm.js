import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function ProductForm() {
  const [pNo,setpNo] = useState("")
  const [original,setOriginal] = useState("")
const [pname,setName] = useState("")
const [pimage1, setImage1] = useState("")
const [pimage2, setImage2] = useState("")
const [pimage3, setImage3] = useState("")

const [pprice, setPrice] = useState("")
const [pdescription,setDescription] = useState("")
  const api = process.env.REACT_APP_API_URL;


  useEffect(()=>
  {
    const generatedDate = Date.now()
    setpNo(generatedDate)
  },[])

    function handletitle(e)
    {
        setName(e.target.value)
    }

    function handleimage1(e)
    {
        setImage1(e.target.value)
    }
    function handleimage2(e)
    {
        setImage2(e.target.value)
    }
    function handleimage3(e)
    {
        setImage3(e.target.value)
    }

    function handleprice(e)
    {
        setPrice(e.target.value)
    }

    function handledescription(e)
    {
        setDescription(e.target.value)
    }
   async function save(e)
    {
        e.preventDefault()
        const productData = {
          pNo:pNo,
            pdescription:pdescription,
            pname: pname,
            pimage1:pimage1,
            pimage2:pimage2,
            pimage3:pimage3,
            original:original,
            pprice:pprice
        }

        // console.log(productData)

   try {
      const res = await Axios.post(`${api}/api/products`, productData);
      console.log(res.data);
      alert('Product added successfully!');
      setpNo('');
      setName('');
      setImage1('');
      setImage2('');
      setImage3('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };
    
  return (
    <div>
        <form onSubmit={save}>
          Product No: <input type='text' placeholder='Enter Product No' value={pNo} readOnly/> <br/><br/>
              Product Title: <input type="text" placeholder="Enter product name" value={pname} onChange={handletitle} required/> <br/><br/>
                Product Image1: <input type="text" placeholder="ENter product Image Url" value={pimage1} onChange={handleimage1} required/> <br/><br/>
Product Image2: <input type="text" placeholder="ENter product Image Url" value={pimage2} onChange={handleimage2} required/> <br/><br/>
                Product Image3: <input type="text" placeholder="ENter product Image Url" value={pimage3} onChange={handleimage3} required/> <br/><br/>

        Product Original Price: <input type='number' placeholder='Enter original price' value={original} onChange={(e)=>setOriginal(e.target.value)}/><br></br>
        Product Price: <input type="number" placeholder="Enter price" value={pprice} onChange={handleprice} required/> <br/><br/>
        Product Description: <textarea value={pdescription} onChange={handledescription} rows="5" cols="20"></textarea> <br/><br/>
        <button type='submit'>Save</button>
        </form>
    </div>
  )
}

export default ProductForm