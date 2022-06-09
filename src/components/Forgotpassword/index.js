import axios from "axios";
import React,{useState,useEffect} from "react";
import './style.css'

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function ForgotPassword(){


    const [emailId,setEmail]=useState({
        emailId:""

    })

    const [notify,setNotify]=useState('')


    const changeHandler=(event)=>{
        setEmail({emailId:event.target.value})

    }

    const submitData= async (e)=>
    {

           e.preventDefault()
           if(emailId.emailId !== '')
           {
              await  axios.post('http://localhost:8000/forgotpassword',emailId)
               .then((response)=>{
                   setNotify(response.data.message)  
               }).catch((error)=>{
                  console.log(error)
               })
           }
             
    } 

  
  const handleReset=()=>{
      setEmail({
          emailId:''
      })
      setNotify('')
  }

    return(
        <div className="container">
             <h1>Forgot Password</h1>
             <p>Enter an emailId that is associated with your account we will send you a link to reset password</p>
            <div className="" style={{"marginTop":"50px"}}>

              

              

               <form onSubmit={submitData}>
               <input type="email" placeholder="EmailId" name="emailId" className="w-50 " value={emailId.emailId} onChange={changeHandler}/>
            
               <div className="text-center">
                
               <button type="submit" className="btn  mt-4 " id='continuebtn'>Continue</button>
            
               <button type='button' className="btn  mt-4 ms-4 " id='resetbtn' onClick={handleReset}>Reset</button> 
              </div>
                
              </form>
              <p className="notify">{notify}</p>
            
            </div>

           
        
        </div>
    )
}