import {Routes ,Route} from 'react-router-dom'
import './App.css';

import ForgotPassword from './components/Forgotpassword';
import ResetPassword from './components/ResetPassword';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<RegisterForm/>}></Route>
       
         <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
         
         <Route path="/password-reset/:id/:token" element={< ResetPassword/>}></Route>

      </Routes>
     
    </div>
  );
}

export default App;
