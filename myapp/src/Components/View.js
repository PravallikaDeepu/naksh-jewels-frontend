import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './style.css'

function View() {
  const { pNo } = useParams();
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const output = await Axios.get("http://localhost:8070/api/products");
        const response = output.data;
        const selectedData = response.find(
          (item) => item.productNo.toString() === pNo
        );
        setMyData(selectedData);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, [pNo]);

  if (!myData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Product Details</h2>
      <div className="card view-card p-4">
        <div className="row">

          {/* 🖼️ Left Column - Carousel inside proper column */}
          <div className="col-md-5 text-center">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={myData.productImage1} className="d-block w-100" alt="Slide 1" />
                </div>
                <div className="carousel-item">
                  <img src={myData.productImage2} className="d-block w-100" alt="Slide 2" />
                </div>
                <div className="carousel-item">
                  <img src={myData.productImage3} className="d-block w-100" alt="Slide 3" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* 📝 Right Column - Product Details */}
          <div className="col-md-7 mt-5">
            <h2 className="card-title">{myData.productName}</h2>
            <hr />
            <h4 className="price">&#8377;{myData.productPrice}</h4>
            <hr />
            <p>Description:</p>
            <p className="card-text para">{myData.productDescription}</p>
      <Link to='/' className='btn btn-outline-secondary' style={{ marginRight: "20px", padding: "10px", width: "100px" }}>Back</Link>
      <Link to={`/api/products/${myData.productNo}`} style={{ width: "100px" }} className='btn btn-outline-danger'>Delete</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default View;
