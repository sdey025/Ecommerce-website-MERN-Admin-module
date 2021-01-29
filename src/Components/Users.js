import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "reactstrap";

function Users() {
    const history = useHistory()
  const [users, setusers] = useState([]);
  const [wishlists, setwishlists] = useState([])
  let date = new Date();
  let year = date.getFullYear();
  let count = 0
  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setusers(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const seeWishlist = (ids) => {
    setwishlists(ids)
    history.push('/wishlist/'+ids)
    
  }
  
  return (
    <div className="py-5 text-center">
        <div className="container">
            <h2 className="mb-4 font-weight-bold">Users</h2>
      <Table dark striped responsive hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>City</th>
            <th>Bio</th>
            <th>Wishlists</th>
            <th>Orders</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
              count++
            return (
              <tr>
                <th scope="row">{count}</th>
                <td>{item.name}</td>
                <td>{year - item.dob.substr(0,4)}</td>
                <td>{item.email}</td>
                <td>{item.location}</td>
                <td>{item.bio}</td>
                <td>{item.wishlist.length}</td>
                <td>{item.orders.length}</td>
                <td><Button color="danger">Freeze</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
export default Users;
