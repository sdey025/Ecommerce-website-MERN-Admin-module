import React, { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import "./css/main.css";
function Status() {
  const { id } = useParams();
  const [product, setproduct] = useState([]);
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() +1
  let year = date.getFullYear()
  let fulldate = `${day}/${month}/${year}`
  useEffect(() => {
    fetch("http://localhost:5000/orderstatus/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setproduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const shipped = (id) => {
    fetch('http://localhost:5000/ship/'+ id,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            pid: id,
            date: fulldate
        })
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
  }
  const reached = (id) => {
    fetch('http://localhost:5000/reach/'+ id,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            pid: id,
            date: fulldate
        })
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
  }
  const deliver = (id) => {
    fetch('http://localhost:5000/deliver/'+ id,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            pid: id,
            date: fulldate
        })
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
  }
  return (
    <div className="container">
      <Card body id="statuscard">
        {product.map((item) => {
          return (
            <Row>
              <Col md={4}>
                <img src={item.ppic} id="statusimg" />
              </Col>
              <Col md={8}>
                <h4 className="mt-2 ml-5">Shipped??</h4>
                {item.delivered == 'no' ? <Button className="ml-5" onClick={() => shipped(item._id)} color="warning">Shipped</Button> : <Button className="ml-5" color="warning">Shipped<FiCheck/></Button> }
                <h4 className="mt-4 ml-5 ">Reached??</h4>
                {item.delivered == 'no' || item.delivered == 'shipped' ? <Button onClick={() => reached(item._id)} className="ml-5" color="warning">Reached</Button> : <Button className="ml-5" color="warning">Reached<FiCheck/></Button> }
                <h4 className="mt-4 ml-5">Delivered??</h4>
                {item.delivered == 'no' || item.delivered == 'shipped' || item.delivered == 'reached' ? <Button onClick={() => deliver(item._id)} color="warning" className="ml-5">Delivered</Button> : <Button className="ml-5" color="warning">Delivered<FiCheck/></Button> }
              </Col>
            </Row>
          );
        })}
      </Card>
    </div>
  );
}

export default Status;
