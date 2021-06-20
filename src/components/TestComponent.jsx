import React, {useEffect} from "react";
import {getClientObj} from "../services/clientService";
import * as authService from "../services/authService";
import * as storage from "../utils/storage";

let client =  getClientObj();


const TestComponent = (props) => {

  useEffect ( () =>{
    
      const func = async ()=>{

        const res1= await client.get("http://localhost:8000/tickets/12345");
        const {data: {data}}= await client.post("http://localhost:8000/auth/login", {
          "email": "hossam@gmail.com",
          "password": "12345"
        });
        authService.login(data);
        const res2= await client.get("http://localhost:8000/tickets/12345");
      }

      func();


  },[]);
 
  return(

    <h3>test </h3>
  );
  
};

export default TestComponent;

