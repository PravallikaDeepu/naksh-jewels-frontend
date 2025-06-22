import React, { useContext } from 'react';
import {Link } from 'react-router-dom';
// import View from './View.js'; // Component to view products
// import ProductForm from './ProductForm.js'; // If you have a form to add products
// import Card from './Card.js';
import { ProductContext } from './ProductContext.js';
import { SearchContext } from './SearchComponent.js';
  import { useEffect } from 'react';


function Navbar() {
  const productData = useContext(ProductContext)
  const {setSearchData} = useContext(SearchContext)
  // console.log(productData)
  function handleSearch(e)
  {
    setSearchData(e.target.value)
    
  }

// useEffect(() => {
//   const popoverTrigger = document.getElementById("mypopover");
//   if (popoverTrigger) {
//     const bsPopover = new window.bootstrap.Popover(popoverTrigger);
//   }
// }, []);

useEffect(() => {
  const popoverTrigger = document.getElementById("mypopover");

  // Get cart from localStorage
  let cart = localStorage.getItem("cart");
  let cartHTML = "";

  if (cart) {
    cart = JSON.parse(cart);
    for (let id in cart) {
      const [qty, name, price] = cart[id];
      cartHTML += `QTY: ${qty}<br/>NAME: ${name}<br/>PRICE: ${price}<br/><hr/>`;
    }
    cartHTML += `<a href='/Cart.html' class='btn btn-success btn-sm mt-2'>Continue</a>`;
  } else {
    cartHTML = "Cart is empty.";
  }

  if (popoverTrigger && window.bootstrap?.Popover) {
    new window.bootstrap.Popover(popoverTrigger, {
      content: cartHTML,
      html: true,
      placement: "bottom",
      trigger: "click",
    });
  }
}, []);

  return (
  
      <div>
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/api/products">Add Product</Link>
                </li>
                <li className="nav-item">
                 
<button
  type="button"
  className="btn btn-secondary"
  data-bs-toggle="popover"
  data-bs-html="true"
  data-bs-placement="bottom"
  data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
  id="mypopover"
>
  Cart
</button>


                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" onChange={handleSearch} aria-label="Search"  />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
     

      {/* <Routes>
        <Route path="/" element={<Card/>}/>
        <Route path="/add-product" element={<ProductForm/>} />
        <Route path="/products" element={<View />} />
      </Routes> */}
    </div>

 
  );
}

export default Navbar;

