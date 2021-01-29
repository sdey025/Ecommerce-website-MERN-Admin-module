import React, { useEffect, useState } from "react";
import { Card, Col, Progress, Row, Table } from "reactstrap";
import {
  FiAlertCircle,
  FiDollarSign,
  FiSettings,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
function Dashboard() {
  let count = 0
  let count1 = 0
  let count2 = 0
  const [products, setproducts] = useState([]);
  const [user, setuser] = useState([]);
  const [payment, setpayment] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allproducts", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setproducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost:5000/users", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setuser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost:5000/getpayment", {
      headers: {
        "Content-Type": "applicaion/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setpayment(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    labels: ["Sept", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 23, 31, 41, 44, 18],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <>
      <div className="container">
        <Row>
          <Col md={6} xs={12}>
            <Row>
              <Col md={6}>
                <Card body className="mt-5 rounded-0" id="card1">
                  <FiUser id="icon" className="mx-auto" />
                  <br />
                  <h2 className="text-center text-light font-weight-bold">
                    {user.length}
                  </h2>
                  <Link to='/users' className="text-decoration-none">
                    <h3 className="text-center text-light font-weight-bold">
                      Users
                    </h3>
                  </Link>
                </Card>
              </Col>
              <Col md={6} xs={12}>
                <Card body className="mt-5 rounded-0" id="card2">
                  <FiShoppingBag id="icon" className="mx-auto" />
                  <br />
                  <h2 className="text-center text-light font-weight-bold">
                    {products.length}
                  </h2>
                  <Link className="text-decoration-none" to="/products">
                    <h3 className="text-center text-light font-weight-bold">
                      Products
                    </h3>
                  </Link>
                </Card>
              </Col>
              <Col md={6}>
                <Card body className="mt-3 rounded-0" id="card3">
                  <FiDollarSign id="icon" className="mx-auto" />
                  <br />
                  <h2 className="text-center text-light font-weight-bold">
                    {payment.length}
                  </h2>
                  <Link to="/transactions" className="text-decoration-none">
                    <h3 className="text-center text-light font-weight-bold">
                      Buys
                    </h3>
                  </Link>
                </Card>
              </Col>
              <Col md={6}>
                <Card body className="mt-3 rounded-0" id="card4">
                  <FiAlertCircle id="icon" className="mx-auto" />
                  <br />
                  <h2 className="text-center text-light font-weight-bold">
                    {payment.length}
                  </h2>
                  <Link className="text-decoration-none">
                    <h3 className="text-center text-light font-weight-bold">
                      Reports
                    </h3>
                  </Link>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="pt-4">
            <Line
              data={data}
              width={100}
              height={50}
              options={{ maintainAspectRatio: false }}
            />
          </Col>
        </Row>
        <br/>
        <Row>
          <Card body className="mt-4 shadow-sm">
            <h3 className="text-center font-weight-bold">Products respective to gender</h3>
          {products.map(item => {
            if(item.gender == 'Male'){
              count++
            }
          })}
          <div className="">{count} of {products.length} Male Products</div>
          <Progress value={count} max={products.length} />

          {products.map(item => {
            if(item.gender == 'Female'){
              count1++
            }
          })}
          <div className="mt-4">{count1} of {products.length} Male Products</div>
          <Progress value={count1} max={products.length} />

          {products.map(item => {
            if(item.gender == 'Kids'){
              count2++
            }
          })}
          <div className="mt-4">{count2} of {products.length} Male Products</div>
          <Progress value={count2} max={products.length} />
          </Card>
        </Row>
        <br/>
        <br/>
      </div>
    </>
  );
}

export default Dashboard;
