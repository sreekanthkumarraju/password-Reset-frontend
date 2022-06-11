import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './style.css'


const ResetPassword = () => {

	const [validUrl, setValidUrl] = useState(false);

	const [password, setPassword] = useState([{
    enteredpassword:"",
    verifypassword:""
  }]);

	const [msg, setMsg] = useState("");

	const [error, setError] = useState("");

	const param = useParams();

	const url = `https://password-reset-page.herokuapp.com/${param.id}/${param.token}`;

  const changeHandler=(event)=>{
       console.log(event.target.value)
       setPassword({...password,[event.target.name]:event.target.value})
       console.log(password)
  }

	useEffect(() => {

		const verifyUrl = async () => {

			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
    
     if(password.enteredpassword!=password.verifypassword)
     {
        setError('passwords not matched')
     }
     else
     {
       console.log('passwords matched')
       console.log(password)
     
       let passworddata= password.enteredpassword
       console.log(passworddata)
    
		try {
			
            const { data } = await axios.post(url, { passworddata});
			  if(data)
              {
                  setMsg(data)
              }
           
			
		} 
        
        catch (error) {
		   console.log(error)
		}
  }
  
};

	return (
		<Fragment>

			{/* {validUrl ? ( */}

				<div className='container'>

					<form  onSubmit={handleSubmit}>

						<h1 className="heading">New Password</h1>

						<input
							type="password"
							placeholder="Password"
							name="enteredpassword"
							onChange={changeHandler}
							value={password.enteredpassword}
							required
							className='enterpassword'
						/>

            	        <input
							type="password"
							placeholder="Confirm Password"
							name="verifypassword"
							onChange={changeHandler}
							value={password.verifypassword}
							required
							className='confirmpassword'
						/>

						{error && <div className='error'>{error}</div>}
						{msg && <div className='notifymsg'>{msg}</div>}
						

						<button type="submit" className='passwordbtn'>
							Submit
						</button>

					</form>

				</div>
			{/* ) : (
				<h1>404 Not Found</h1>
			)} */}

		</Fragment>
	);
};

export default ResetPassword;