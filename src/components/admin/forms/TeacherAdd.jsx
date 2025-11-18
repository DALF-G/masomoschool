import React, { useContext, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeacherAdd = () => {
  const {token} = useContext(AuthContext)
  const authHeader = {
    headers : {Authorization : `Bearer ${token}`}
  }
  // Declare the hooks to enable you store values
    const[name, setName] = useState("");
    const[email, setEmail] = useState("")
    const[phone, setPhone] = useState("");
    const[subject, setSubject] = useState("");
  
    // Declare a function to handle what happens when a person clicks on the save button
    const handleSubmit = async (e) => {
      // Prevent the site from reloading
      e.preventDefault()
  
      // take the data and create the object of the data from the hooks
      const data = {name, email, phone, subject}

      try{
        toast.info("Please wait as we add the new Teacher..")
        const res = await axios.post("https://kindergartenapi-olyn.onrender.com/api/teacher/add", data, authHeader)
  
        toast.dismiss()
        toast.success(res.data.message || "Teacher added successfully");
  
        // Clear the hooks ready to receive a new data of a class
        setName("");
        setEmail("");
        setPhone();
        setSubject("")
        
      }
      catch(err){
        toast.dismiss()
        toast.error(err.response.data.message || "Error adding a new class.")
      }
    }
  
  
  return (
    <div className='container mt-2'>

      <ToastContainer position='top-right' autoClose={3000}/>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to={"/admin-dashboard"}>Dashboard</Link></li>

          <li class="breadcrumb-item" aria-current="page"><Link to={"/admin-dashboard/teachers"}>Teachers</Link></li>

          <li class="breadcrumb-item active" aria-current="page">Add Teacher</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-4 text-success">
          <i class="bi bi-person-check"></i> Add new teacher
          </h5>
          <Link className="btn btn-success" to={"/admin-dashboard/teachers"}>
          <i className="bi bi-box-arrow-in-left"></i>
          Back</Link>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input type='text'
            placeholder='Enter Name '
            className='form-control'
            required
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />  
            {/* {name}           */}
          </div>

          <div className="col-md-6 mb-3">
            <input type='text'
            placeholder='Enter Email'
            className='form-control'
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />   
            {/* EMAIL */}
          </div>

          <div className="col-md-6 mb-3">
            <input type='number'
            placeholder='Enter the Phone number'
            className='form-control'
            required
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}             
            />
            {/* {phone} */}
          </div>

          <div className="col-md-6 mb-3">
            <input type='text'
            placeholder='Enter Subject'
            className='form-control'
            required
            value={subject}
            onChange={(e)=>setSubject(e.target.value)}
            />   
            {/* subject */}
          </div>

        </div>
        <button className="btn btn-outline-success" type='submit'>
            Save Teacher
          </button>
      </form>
      </div>

    </div>
  )
}


export default TeacherAdd
