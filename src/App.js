import './App.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import Homecomponent from './components/Homecomponent';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
     <Routes>
       <Route path='/' element={<Homecomponent/>} />
     </Routes>
    </Router>
  );
}

export default App;
