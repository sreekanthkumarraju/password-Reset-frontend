import {Routes ,Route} from 'react-router-dom'
import './App.css';

import ForgotPassword from './components/Forgotpassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<ForgotPassword/>}></Route>
         <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
         
         <Route path="/password-reset/:id/:token" element={< ResetPassword/>}></Route>

      </Routes>
     
    </div>
  );
}

export default App;
