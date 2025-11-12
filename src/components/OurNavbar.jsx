import React from 'react'
import { Link } from 'react-router-dom'

const OurNavbar = () => {
  return (
    <div>
        {/* Navbar */}
       <nav className="navbar navbar-expand-md navbar-dark bg-success">
          <div className="container">
            <Link className='navbar-brand' to={'/'}>Masomo Plus School</Link>

            {/* below is the toggle button - Either to expand or collapse contents of the navbar */}
            <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#navbarnav" aria-expanded="false">
              <span className='navbar-toggler-icon'></span>
            </button>

            {/* Below is the div that carries all the link to different pages */}
            <div className="collapse navbar-collapse justify-content-end" id='navbarnav'>
              <ul className="navbar-nav">
                <li className="nav-item"><Link to={"/"} className='nav-link active'>Home</Link> </li>
                <li className="nav-item"><a href="#About" className="nav-link">About</a></li>
                <li className="nav-item"><a href="#cbc" className="nav-link">CBC-Curriculum</a></li>
                <li className="nav-item"><a href="#whyMasomoPlus" className="nav-link">Why-Us?</a></li>
                <li className="nav-item"><Link to={"/login"} className='nav-link'>Login</Link> </li>
              </ul>
            </div>
          </div>
       </nav>
    </div>
  )
}

export default OurNavbar