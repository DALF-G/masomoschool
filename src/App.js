import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homecomponent from './components/Homecomponent';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/"
import Registercomponent from './components/Registercomponent';
import Logincomponent from './components/Logincomponent';
import Notfound from './components/Notfound';
function App() {
  return (
   
     <Routes>
       <Route path='/' element={<Homecomponent/>} />
       <Route path='/register' element={<Registercomponent/>}/>
       <Route path='/login' element={<Logincomponent/>} />
       <Route path='*' element={<Notfound/>} />
     </Routes>
   
  );
}

export default App;
