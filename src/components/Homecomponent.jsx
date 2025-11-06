import React from 'react'
import "../components/css/home.css"
import { Link } from 'react-router-dom'

const Homecomponent = () => {
  return (
    <div className='homepage'>
      {/* navbar */}
      <nav className='navbar navbar-expand-md navbar-dark bg-success'>
        <div className="container">
          <Link className='navbar-brand' to={'/'}>Masomo Plus School</Link>

          {/* below is the toggle button - either to expard or collapse contents of the navbar */}
          <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarnav">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Below is the div that carries all the link to different pages */}
          <div className= "collapse navbar-collapse justify-content-end" id='navbarnav'>
            <ul className='navbar-nav'>
              <li className='nav-item'><Link to={"/"} className='nav-link active'>Home</Link></li>
              <li className='nav-item'><a href="#About" className="nav-link">About</a></li>
              <li className='nav-item'><a href="#cbc" className="nav-link">CBC-Curriculum</a></li>
              <li className='nav-item'><a href="#WhyMasomoPlus" className="nav-link">Why-us?</a></li>
              <li className='nav-item'><Link to={"/login"} className='nav-link'>Login</Link></li>
            </ul>

          </div>
        </div>
      </nav>
      
      {/* Below is the hero section */}
      <section className="hero position-relative text-white">
  <img
    src="images/banner1.jpg"
    alt="Hero Banner"
    className="w-100 img-fluid"
    style={{
      maxHeight: '580px',
      minHeight: '300px',
      objectFit: 'cover',
    }}
  />

  <div
    className="hero-text position-absolute top-50 start-50 translate-middle text-center bg-dark bg-opacity-75 p-3 p-md-4 rounded"
    style={{
      maxWidth: '90%',
      width: '580px',
    }}
  >
    <h1 className="fs-4 fs-md-3 fs-lg-2 mb-3">
      Empowering Minds Through <br />
      Competence Learning
    </h1>

    <p className="small mb-4">
      Welcome to Masomo Plus — Nurturing future Leaders in Kenya.
    </p>

    <a href="#about" className="btn btn-light btn-sm">
      Learn More About Masomo+
    </a>
  </div>
</section>

{/* About Section */}
<section className='py-1 bg-ligt' id='About'>
  <div className='container'>
    <h2 className="text-success text-center">About Masomo Plus School</h2>
    <p>Masomo Plus School is a leading institution dedicated to providing quality education rooted in the Competence-Based-Curriculum. 
      We offer focus on wholistic development, creativity and real-world skills for tommorow's Leaders</p>
  </div>
</section>

{/* CBC Section */}
<section className='py-2' id='cbc'>
  <div className="container">
    <h2 className="text-success text-center">Understanding CBC in Kenya</h2>
    <p>
      The Competence-Based Curriculum was introduced in kenya to replace the 8-4-4 education system.
      It focuses on Nurturing Learners talents and abilities through practical,skills oriented Learning experiences.
      CBC emphasizes learners centered teaching and aims at developing competences that align with national development goals.
    </p>
    <ul className="list-group list-group-flush mt-2">
      <li className="list-group-item">✅ Focus on Skills & talents</li>
      <li className="list-group-item">✅ Learner-Centered Approach</li>
      <li className="list-group-item">✅ Real Life Problem Solving</li>
      <li className="list-group-item">✅ Continous Assessment</li>
    </ul>
  </div>
</section>

{/* Why masomo plus */}
<section className="py-2 bg-light" id='WhyMasomoPlus'>
  <div className="container">
    <h2 className="text-success text-center mb-4">Why Choose Masomo Plus</h2>
    {/* Below is the bs grid system that contains three partitions with three cards */}

    <div className="row">
      <div className="col-md-4">
        <div className="card show h100 text-center p-2">
          <div className="card-body">
            <h3 className="card-title">Experienced Teachers</h3>
            <p >Our educators are trained in CBC and are commited to Student's Growth.</p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card show h100 text-center p-2">
          <div className="card-body">
            <h3 className="card-title">Modern Facilities</h3>
            <p >We provide state of the art learning Facilities, Libraries and Learning Spaces.</p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card show h100 text-center p-2">
          <div className="card-body">
            <h3 className="card-title">Co-Curricular Activities</h3>
            <p >Our Students are able to explore sports, arts, tech and leadership beyond books.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* Footer section */}
<footer className="bg-dark text-white text-center py-3">
  <p className="mb-0">
    Copyright &copy; {new Date().getFullYear()} Masomo Plus School. All Rights Reserved.
  </p>
</footer>


    </div>
  )
}

export default Homecomponent
