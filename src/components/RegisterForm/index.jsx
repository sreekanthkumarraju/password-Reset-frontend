import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

export default function RegisterForm(){

    const [userData,setUser]=useState([
        {
            
            emailId:"",
            password:""
        }


    ])
    const [error,setError]=useState({})
    const [issubmitted,setSumbit]=useState(false)
   

    let navigate=useNavigate()
    const changeHandler=((event)=>{
         console.log(event)

          setUser({...userData,[event.target.name]:event.target.value})      

    })
    
          
    const handleSubmit=(event)=>{
        event.preventDefault() 
        setSumbit(true)
        setError(validate(userData))
        console.log(userData)             
    }

    const validate=(values)=>{
        const error={}
        //RegExp --Pattern of characters--to do pattern matching search and replace functions on text
        const Regex=/^[^-./_\0-9][a-zA-Z0-9._-]+@gmail+.com/;
  
     if(!values.emailId)
       {
          error.email="Email is required "
       }
     else if(!Regex.test(values.emailId))
       {
         error.emailId="invalid email address"
       }
  
       if(!values.password)
       {
          error.password="password is required"
       }  
       else if(!/^\S*$/.test(values.password))
        {
          error.password="password should not have any white spaces"
        }
       else if(!/(?=.*[a-z]).*$/.test(values.password))
        {
           error.password="password must have atleast one lowercase letter"
        }
  
         else if(!/(?=.*[A-Z]).*$/.test(values.password))
         {
            error.password="password must have atleast one UpperCase letter"
         }
       
       return error
  
     }

     useEffect(()=>{
           
           //Object.keys will return an Array, which contains the property names of the object
          // If the length of the array is 0==> then object is empty
           if(Object.keys(error).length===0 && issubmitted ){
            axios.post("https://password-reset-page.herokuapp.com/register",userData)
              .then((response)=>{
                   console.log(response)
                   navigate('/forgotpassword')
              })
              .catch((err)=>{
                  console.log(err)
              })    
          } 

     })
  

    return(
       
    <div className='container'>  
       <div className='row  ' style={{"marginTop":"200px","marginLeft":"150px"}}>
      <div className='col col-6 '>
         <div className='ms-5'>
             
            <form onSubmit={handleSubmit}>
            
              <input type="email" className='mb-4 form-control' name="emailId" value={userData.emailId} placeholder="EmailID" required onChange={changeHandler} />
               <p>{error.emailId}</p>
              
              
              <input type="password" className='mb-4 form-control' name="password" value={userData.password} placeholder="Password" required onChange={changeHandler} />
              <p style={{"fontSize":"14px"}}>* must have atleast one UpperCase letter and one digit and one special character </p>
               <p>{error.password}</p>
              
              <button type="submit" className='btn-lg rounded-pill'>Register</button>
              
           </form>
       
          </div>
          </div>
          <div className='col col-6 '>
          <div className='mt-3 rounded-top rounded-bottom pt-5' style={{"backgroundColor":"#3bb19b","width":"230px","height":"300px"}}>
              <h1>Forgot Password</h1>
              <Link to="/forgotpassword">
                 <button type="button" className='btn-lg rounded-pill mt-4 bg-white'>Forgot Password</button>
              </Link>
          </div>
          </div>
          </div> 
     </div>
    )
}