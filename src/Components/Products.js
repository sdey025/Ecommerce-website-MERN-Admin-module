import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
} from "reactstrap";
import {Link, useHistory} from 'react-router-dom'
function Products() {

  const [products, setproducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allproducts", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setproducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let pid = "";
  let count = 0;

  return (
    <>
      <h2 className="text-center font-weight-bold mt-4">Products</h2>
      <div className="container">
        <Table dark striped responsive hover>
          <thead>
            <tr>
              <th>Sl no.</th>
              <th>Product</th>
              <th>Product Name</th>
              <th>For</th>
              <th>Description</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              count++;
              return (
                <tr>
                  <th scope="row">{count}</th>
                  <td>
                    <img src={item.photo} style={{ width: "50px" }} />
                  </td>
                  <td>{item.p_name}</td>
                  <td>{item.gender}</td>
                  <td>{item.desc}</td>
                  <td>₹{item.cost}</td>
                  <td>
                    <Link to={`/details/${item._id}`}><Button
                      color="info"
                      className="rounded-0"
                    >
                      Details
                    </Button></Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Products;
