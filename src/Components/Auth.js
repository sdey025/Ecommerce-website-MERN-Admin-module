import React, { useEffect, useState } from "react";
import "./css/main.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,Input
} from "reactstrap";
import swal from 'sweetalert'
import { useHistory } from "react-router-dom";
function Auth() {
    const history = useHistory()
    const [password, setpassword] = useState('');
    const correctpassword = '12345678';
    const login = () => {
        if(!password){
            swal('Opps!','Please Enter the password!!!','warning')
        }
        else if(password != correctpassword){
            swal('Opps!','Wrong password!!!','error')
        }
        else{
            history.push('/dashboard')
        }
    }
    console.log(password)
  return (
    <div className="pt-5" id="authdiv">
        <div className="container">
      <Card body id="card">
        <h1 id="cardh" className="text-center">Admin Login</h1>
        <Input className="rounded-0" id="myinput" value="admin@admin.com" readOnly/>
        <Input className="rounded-0 mt-4" onChange={e => setpassword(e.target.value)} id="myinput" placeholder="Enter Admin password" type="password"/>
        <Button outline color="info" id="mybtn" onClick={login}>Login</Button>
        <br/>
        <p id="instruction">Instructions</p>
        <p className="pt-3" id="instruction1">1. Please don't enter wrong password more than 3 times.</p>
        <p id="instruction1">2. Don't forget to logout after being the work done.</p>
      </Card>
      </div>
    </div>
  );
}

export default Auth;
