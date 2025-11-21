import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

const ParentEdit = () => {
    const {token} = useContext(AuthContext)

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  }

  // Retrieve passed teacher data via useLocation
  const { state } = useLocation()
  const selectedParent = state?.parentData

  console.log("The selected parent details are:", selectedParent)

  // Declare hooks to store teacher fields
  const [name, setName] = useState(selectedParent?.name || "")
  const [email, setEmail] = useState(selectedParent?.email || "")
  const [phone, setPhone] = useState(selectedParent?.phone || "")
  const [nationalId, setNationalId] = useState(selectedParent?.nationalId || "")
  const [address, setAddress] = useState(selectedParent?.address || "")

  console.log("The parent details are:", selectedParent)

  // Function to fetch all parents
  const fetchParents = async () => {
    try {
      toast.info("Loading parents...")

      const res = await axios.get(
        "https://kindergartenapi-olyn.onrender.com/api/parent",
        authHeader
      )

      toast.dismiss()
    } catch (err) {
      toast.dismiss()
      toast.error(err.response?.data?.message || "Failed to load parent")
    }
  }

  // useEffect to automatically fetch classes
  useEffect(() => {
    fetchParents()
  }, [])

  // Declare the navigate hook
  const navigate = useNavigate()

  // Function to handle the teacher update
  const handleEdit = async (e) => {
    e.preventDefault()

    const data = {
      name,
      email,
      phone,
      nationalId,
      address
    }

    try {
      toast.info("Please wait as we update the parent details...")

      const res = await axios.put(
        `https://kindergartenapi-olyn.onrender.com/api/parent/${selectedParent._id}`,
        data,
        authHeader
      )

      toast.dismiss()
      toast.success(res.data?.message || "Parent details updated successfully")
      navigate("/admin-dashboard/parents")

    } catch (err) {
      toast.dismiss()

      const msg =
        err.response?.data?.message ||
        err.message ||
        "Error updating parent"

      toast.error(msg)
    }
  }

  return (
    <div className='container mt-2'>
    
          <ToastContainer position='top-right' autoClose={3000} />
    
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={"/admin-dashboard"}>Dashboard</Link></li>
    
              <li className="breadcrumb-item" aria-current="page">
                <Link to={"/admin-dashboard/parents"}>Parents</Link>
              </li>
    
              <li className="breadcrumb-item active" aria-current="page">Edit Parent</li>
            </ol>
          </nav>
    
          <div className="card p-4 shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-4 text-success">
                <i className="bi bi-pencil-square"></i> Edit Parent Details
              </h5>
              <Link className="btn btn-success" to={"/admin-dashboard/parents"}>
                <i className="bi bi-box-arrow-in-left"></i> Back
              </Link>
            </div>
    
            <form onSubmit={handleEdit}>
    
              <div className="row">
    
                <div className="col-md-6 mb-3">
                  <input type='text'
                    placeholder='Enter Parent Name'
                    className='form-control'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
    
                <div className="col-md-6 mb-3">
                  <input type='email'
                    placeholder='Enter Email Address'
                    className='form-control'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
    
                <div className="col-md-6 mb-3">
                  <input type='text'
                    placeholder='Enter Phone Number'
                    className='form-control'
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
    
                <div className="col-md-6 mb-3">
                  <input type='text'
                    placeholder='Enter National I.D'
                    className='form-control'
                    required
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                </div>
    
                <div className="col-md-6 mb-3">
                  <input type='text'
                    placeholder='Enter Address'
                    className='form-control'
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
    
              </div>
    
              <button className="btn btn-outline-success" type='submit'>
                <i className="bi bi-floppy2"></i> Update Parent
              </button>
            </form>
    
          </div>
        </div>
      )
    }
    

export default ParentEdit
