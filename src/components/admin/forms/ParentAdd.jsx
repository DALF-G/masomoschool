import React, { useContext, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ParentAdd = () => {
    const {token} = useContext(AuthContext)
      const authHeader = {
        headers : {Authorization : `Bearer ${token}`}
      }
      // Declare the hooks to enable you store values
        const[name, setName] = useState("");
        const[email, setEmail] = useState("")
        const[phone, setPhone] = useState("");
        const[nationalId, setNationalId] = useState("");
        const[address, setAddress] = useState("");
      
        // Declare a function to handle what happens when a person clicks on the save button
        const handleSubmit = async (e) => {
          // Prevent the site from reloading
          e.preventDefault()
      
          // take the data and create the object of the data from the hooks
          const data = {name, email, phone, nationalId,address}
    
          try{
            toast.info("Please wait as we add a new parent..")
            const res = await axios.post("https://kindergartenapi-olyn.onrender.com/api/parent/add", data, authHeader)
      
            toast.dismiss()
            toast.success(res.data.message || "Parent added successfully");
      
            // Clear the hooks ready to receive a new data of a class
            setName("");
            setEmail("");
            setPhone();
            setNationalId();
            setAddress("")
            
          }
          catch(err){
            toast.dismiss()
            toast.error(err.response.data.message || "Error adding a parent.")
          }
        }

  return (
     <div className='container mt-2'>
    
          <ToastContainer position='top-right' autoClose={3000}/>
    
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to={"/admin-dashboard"}>Dashboard</Link></li>
    
              <li class="breadcrumb-item" aria-current="page"><Link to={"/admin-dashboard/parents"}>Parents</Link></li>
    
              <li class="breadcrumb-item active" aria-current="page">Add Parent</li>
            </ol>
          </nav>
    
          <div className="card p-4 shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-4 text-success">
              <i class="bi bi-person-check"></i> Add new Parent
              </h5>
              <Link className="btn btn-success" to={"/admin-dashboard/parents"}>
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
                placeholder='Enter National I.D'
                className='form-control'
                required
                value={nationalId}
                onChange={(e)=>setNationalId(e.target.value)}
                />   
                {/* National i.d */}
              </div>

              <div className="col-md-6 mb-3">
                <input type='text'
                placeholder='Enter Address'
                className='form-control'
                required
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                />   
                {/* address */}
              </div>
    
            </div>
            <button className="btn btn-outline-success" type='submit'>
                Save parent
              </button>
          </form>
          </div>
    
        </div>
      )
    }

export default ParentAdd
