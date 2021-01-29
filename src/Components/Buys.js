import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
function Buys() {
  let count = 0;
  const [payment, setpayment] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/getpayment", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setpayment(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="py-5 text-center">
      <div className="container">
        <h2 className="mb-4 font-weight-bold">Transactions</h2>
        <Table dark striped responsive hover>
          <thead>
            <tr>
              <th>Sl. no.</th>
              <th></th>
              <th>Product</th>
              <th>Transaction id</th>
              <th>Ordered at</th>
              <th>Ordered by</th>
              <th>Product cost</th>
              <th>Order address</th>
              <th>Delivery status</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((item) => {
                count++
              return (
                <tr key={count}>
                  <td>{count}</td>
                  <td><img src={item.ppic} style={{width:"50px"}} /></td>
                  <td>{item.pname}</td>
                  <td>{item._id}</td>
                  <td>{item.date} at {item.time}</td>
                  <td>{item.uname}</td>
                  <td>₹{item.pcost}</td>
                  <td>{item.address}</td>
                  <td>{item.delivered}<Link to={`/Status/`+item._id} className="text-light text-decoration-none"> (Change status)</Link></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Buys;
