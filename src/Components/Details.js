import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

function Details() {
  const { id } = useParams();
  const [product, setproduct] = useState([]);
  const [users, setusers] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/prodetails/" + id, {
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
      fetch('http://localhost:5000/users',{
          headers:{
            "Content-Type": "application/json",
          }
      }).then(res => res.json())
      .then(data => {
          setusers(data)
      })
      .catch(err => {
          console.log(err)
      })
  }, []);
  let sum = 0
  let i = 0

  return (
    <div className="container">
      {product.map((item) => {
        return (
          <Card body id="detailscard">
            <Row>
              <Col md={7}>
                <img
                  src={item.photo}
                  className="mx-auto"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col md={5}>
                <h4>{item.p_name}</h4>
                for
                <h5>{item.gender}</h5>
                <h4 className="mt-4">Orders: <b>{item.orders.length}</b></h4>
                <h4 className="mt-4">Wishlisted by: <b>{item.wishlist.length}</b></h4>
                <h4 className="mt-4">Uploaded by: <b>{users.map(user => {
                    if(user._id.includes(item.postedby)){
                        return(
                            user.name
                        )
                    }
                })}</b></h4>
                <h4 className="mt-4">{item.rating.map(rate => {
                    sum = sum + rate 
                })} Rating: <b>{sum/item.rating.length}</b> </h4>
                <h4 className="mt-4">Product description: <b>{item.desc}</b></h4>
              </Col>
            </Row>
          </Card>
        );
      })}
    </div>
  );
}

export default Details;
