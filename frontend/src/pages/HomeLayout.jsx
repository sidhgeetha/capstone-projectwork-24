import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeLayout= () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://664284773d66a67b3437895d.mockapi.io/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{marginTop:"24px", marginRight:"24px"}}>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((item, index) => {
          return (
            <>
              <div key={index}>
                <div className="col">
                  <div className="card ">
                    <img
                      src={item.product_image}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.product_name}</h5>
                      <h5 className="card-title">{item.product_price}</h5>
                      <p className="card-text"> {item.product_description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default HomeLayout;
