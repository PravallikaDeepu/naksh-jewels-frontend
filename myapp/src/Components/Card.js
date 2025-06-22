import { useState, useEffect, useContext } from "react";
import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from './SearchComponent.js';
import './style.css';

function Card() {
  const [myData, setmyData] = useState([]);
  const { searchData } = useContext(SearchContext);
  const navigate = useNavigate();
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8070';

  useEffect(() => {
    const fetchData = async () => {
      try {
                // const output = await Axios.get('http://localhost:8070/api/products')
                const output = await Axios.get(`${API_BASE_URL}/api/products`)
        setmyData(output.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  function handleView(val) {
    console.log(val);
    navigate(`/product/${val.productNo}`);
  }

  function addProduct(data) {
    console.log("Hi")
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
    const myId = data.productNo;
    const name = data.productName;
    const price = Number(data.productPrice);
    let quantity;

    if (cart[myId] === undefined) {
      quantity = 1;
      cart[myId] = [quantity, name, price];
    } else {
      quantity = cart[myId][0] + 1;
      cart[myId][0] = quantity;
      cart[myId][2] = quantity * price;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(cart);
  }

  function displayCart(myCart) {
    let cartData = "";
    for (let i in myCart) {
      cartData +=
        "QTY: " + myCart[i][0] + "<br/>" +
        "NAME: " + myCart[i][1] + "<br/>" +
        "PRICE: " + myCart[i][2] + "<br/><hr/>";
    }
    cartData += "<a href='customerData.html' class='btn btn-success'>Continue</a>";

    const popover = document.getElementById("mypopover");
    if (popover) {
      popover.setAttribute("data-content", cartData);
    }
  }

  const filteredData = myData.filter((val) =>
    val.productName.toLowerCase().includes(searchData.toLowerCase())
  );

  const resultData = searchData.trim() === "" ? myData : filteredData;

  return (
    <div className="d-flex flex-wrap gap-5" id="card">
      {resultData.length === 0 ? (
        <p>No books present.</p>
      ) : (
        resultData.map((val, index) => (
          <div className="card" key={index} style={{ width: "18rem" }}>
            <img
              src={val.productImage1}
              className="card-img-top"
              id="card-image"
              alt={val.productName}
              onClick={() => handleView(val)}
            />
            <p className="card-title" id="proname">{val.productName}</p>
            <div className="card-body">
              <h5><del>{val.productOriginal}</del></h5>
              <h2>{val.productPrice}</h2>
              <button
                className="btn btn-primary"
                id="cart"
                onClick={() => addProduct(val)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Card;
