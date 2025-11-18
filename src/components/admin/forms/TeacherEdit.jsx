import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

const TeacherEdit = () => {

  const {token} = useContext(AuthContext)

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  }

  // Retrieve passed teacher data via useLocation
  const { state } = useLocation()
  const selectedTeacher = state?.teacherData

  console.log("The selected teacher details are:", selectedTeacher)

  // Declare hooks to store teacher fields
  const [name, setName] = useState(selectedTeacher?.name || "")
  const [email, setEmail] = useState(selectedTeacher?.email || "")
  const [phone, setPhone] = useState(selectedTeacher?.phone || "")
  const [password, setPassword] = useState(selectedTeacher?.password || "")
  const [subject, setSubject] = useState(selectedTeacher?.subject || "")

  console.log("The teacher details are:", selectedTeacher)

  // Function to fetch all classes
  const fetchClasses = async () => {
    try {
      toast.info("Loading teachers...")

      const res = await axios.get(
        "https://kindergartenapi-olyn.onrender.com/api/classroom",
        authHeader
      )

      toast.dismiss()
    } catch (err) {
      toast.dismiss()
      toast.error(err.response?.data?.message || "Failed to load teachers")
    }
  }

  // useEffect to automatically fetch classes
  useEffect(() => {
    fetchClasses()
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
      subject,
      password
    }

    try {
      toast.info("Please wait as we update the teacher details...")

      const res = await axios.put(
        `https://kindergartenapi-olyn.onrender.com/api/teacher/${selectedTeacher._id}`,
        data,
        authHeader
      )

      toast.dismiss()
      toast.success(res.data?.message || "Teacher details updated successfully")
      navigate("/admin-dashboard/teachers")

    } catch (err) {
      toast.dismiss()

      const msg =
        err.response?.data?.message ||
        err.message ||
        "Error updating teacher"

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
            <Link to={"/admin-dashboard/teachers"}>Teachers</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">Edit Teacher</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-4 text-success">
            <i className="bi bi-pencil-square"></i> Edit Teacher Details
          </h5>
          <Link className="btn btn-success" to={"/admin-dashboard/teachers"}>
            <i className="bi bi-box-arrow-in-left"></i> Back
          </Link>
        </div>

        <form onSubmit={handleEdit}>

          <div className="row">

            <div className="col-md-6 mb-3">
              <input type='text'
                placeholder='Enter Teacher Name'
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
                placeholder='Enter Subject (e.g. Math, English)'
                className='form-control'
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Assigned Class Dropdown */}
            <div className="col-md-6 mb-3">
              <input type='text'
                placeholder='Update Password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>

          <button className="btn btn-outline-success" type='submit'>
            <i className="bi bi-floppy2"></i> Update Teacher
          </button>
        </form>

      </div>
    </div>
  )
}

export default TeacherEdit
