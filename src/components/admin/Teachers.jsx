import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Teachers = () => {

  // Below we have teachers hooks that stores all the teachers fetched from the API
  const [teachers, setTeachers] = useState([]);
  const {token} = useContext(AuthContext)

  const navigate = useNavigate();
  
  const authHeader = {
    headers : {Authorization : `Bearer ${token}`}
  }

  console.log("The teachers fetched from API are:", teachers)

  // Below is the function that shall enable us to fetch the teachers from the Api
  const fetchTeachers = async ()=>{
    try{
      toast.info('Loading Teachers...')

      const res = await axios.get("https://kindergartenapi-olyn.onrender.com/api/teacher", authHeader)
      
      // By use of the setTeachers function update the teachers hook with the data received from the API
      setTeachers(res.data)

      // Finally dismiss the toast
      toast.dismiss()
    }
    catch(err){
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to load Teachers")
    }
  }

  // We shall use the useEffect hook which invokes itself automatically whenever a person lands on that component. 
  // The useEffect hook will invoke the fetchTeachers function declared on top.
  useEffect(()=>{
    fetchTeachers()
  }, [])

  // Below is the function to add the delete function
  const handleDelete = async (id)=>{
    if(window.confirm("Do you really want to delete this teacher?")){
      try{
        toast.warning("Deleting Teacher. Please wait...")
        await axios.delete(`https://kindergartenapi-olyn.onrender.com/api/teacher/${id}`, authHeader)

        // after deleting the teacher use the fetchTeachers() function to retrieve the new list of teachers
        fetchTeachers()
      }
      catch(err){
        toast.dismiss()
        toast.error(err.response.data.message)
      }
    }
  }

  // Declare a function to handle what happens when the edit button is clicked
  const handleEdit = (teacherData) =>{
    navigate("/admin-dashboard/teachers/edit", {state : {teacherData}})
  }
  
  return (
    <div className='container mt-2'>

      <ToastContainer position='top-right' autoClose={3000}/>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to={"/admin-dashboard"}>Dashboard</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Teachers</li>
        </ol>
      </nav>

      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success mb-0">
          <i class="bi bi-person-badge-fill"></i> Teachers List
          </h5>

          {/* Below is the button to add a new teacher */}
          <button className="btn btn-success" onClick={()=> navigate("/admin-dashboard/teachers/add")}>
          <i class="bi bi-plus-circle"></i>
            Add Teacher
          </button>
        </div>

        {/* Below we populate the teachers inside a table using the map function */}
        <div className="table-responsive">
          {teachers.length === 0 ?(
            <div className="alert alert-warning text-center mb-0">
            <h5><i class="bi bi-patch-exclamation-fill"></i> No Teachers Found</h5>
            </div>
          ):(
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) =>(
                  <tr key={teacher._id}>
                    <td>{ index + 1 }</td>
                    <td>{ teacher.name }</td>
                    <td>{ teacher.email }</td>
                    <td>{ teacher.phone }</td>
                    <td>{ teacher.subject }</td>
                    <td>
                      <button className='btn btn-sm btn-warning me-2'>
                        <i class="bi bi-pen-fill" onClick={()=> handleEdit(teacher)}>Edit</i>
                      </button>

                      <button className='btn btn-sm btn-danger me-2'
                      onClick={()=> handleDelete(teacher._id)}>
                        <i class="bi bi-trash-fill">Delete</i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Teachers
