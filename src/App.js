import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Homecomponent from './components/Homecomponent';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Registercomponent from './components/Registercomponent';
import Logincomponent from './components/Logincomponent';
import Notfound from './components/Notfound';
function App() {
  return (
    <Router>
     <Routes>
       <Route path='/' element={<Homecomponent/>} />
       <Route path='/register' element={<Registercomponent/>}/>
       <Route path='/login' element={<Logincomponent/>} />
       <Route path='*' element={<Notfound/>} />
     </Routes>
    </Router>
  );
}

export default App;
