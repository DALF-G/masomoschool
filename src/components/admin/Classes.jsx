import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { tab } from '@testing-library/user-event/dist/tab'

const Classes = () => {

  // Below we have classes hooks that stalls all the classes fetched from the API
  const [classes, setClasses] = useState([]);
  const {token} = useContext(AuthContext)

  const navigate = useNavigate();
  
  const authHeader = {
    headers : {Authorization : `Bearer ${token}`}
  }

  console.log("The classes fetched from API are:", classes)

  // Below is the funcyion that shall enable us to fetch the classes from the Api
  const fetchClasses = async ()=>{
    try{
      toast.info('Loading Classes...')

      const res = await axios.get("https://kindergartenapi-olyn.onrender.com/api/classroom", authHeader)
      
      // By use of the setClasses function update the classes hook with the data received from the API
      setClasses(res.data.classrooms)

      // Finally dismis the toast
      toast.dismiss()
    }
    catch(err){
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to load Classes")
    }
  }

  // We shall use the useEffect hook which involkes itself aoutomatically whwnever a person lands on that component. the useEffect hook, will invoke for the fetchclasses function declared on top.
  useEffect(()=>{
    fetchClasses()
  }, [])

  // Below is the function to add the delete function
  const handleDelete = async (id)=>{
    if(window.confirm("Do you really want to delete this class?")){
      try{
        toast.warning("Deleting Class. please wait..")
        await axios.delete(`https://kindergartenapi-olyn.onrender.com/api/classroom/${id}`, authHeader)

        //after deleting the class use the fetchclasses()function to retrive the new list of classes
        fetchClasses()
      }
      catch(err){
        toast.dismiss()
        toast.error(err.response.data.message)
      }
    }
  }

  // Declare a function to handle what happens when the edit button is clicked
  const handleEdit = (classData) =>{
    navigate("/admin-dashboard/classes/edit", {state : {classData}})
  }
   return (
    <div className='container mt-2'>

      <ToastContainer position='top-right' autoClose={3000}/>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to={"/admin-dashboard"}>Dashboard</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Classes</li>
        </ol>
      </nav>

      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success mb-0">
          <i class="bi bi-houses"></i> Classes List
          </h5>

          {/* Below is the button to add a new class */}
          <button className="btn btn-success" onClick={()=> navigate("/admin-dashboard/classes/add")}>
          <i class="bi bi-plus-circle"></i>
            Add Class
          </button>
        </div>

        {/* Below we populate the classes inside a table by use of the map function */}
        <div className="table-responsive">
          {classes.length === 0 ?(
            <div className="alert alert-warning text-center mb-0">
            <h5><i class="bi bi-patch-exclamation-fill"></i>  Not Classes Found</h5>
            </div>
          ):(
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Class Name</th>
                  <th>Class Level</th>
                  <th>Class Year</th>
                  <th>Teacher</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls, index) =>(
                  <tr key={cls._id}>
                    <td>{ index + 1 }</td>
                    <td>{ cls.name }</td>
                    <td>{ cls.gradeLevel }</td>
                    <td>{ cls.classYear }</td>
                    <td>{ cls.teacher?.name || "N/A" }</td>
                    <td>{ cls.teacher?.phone || "N/A" }</td>
                    <td>
                      <button className='btn btn-sm btn-warning me-2'><i class="bi bi-pen-fill"
                      onClick={()=> handleEdit(cls)}></i></button>

                      <button className='btn btn-sm btn-danger me-2'
                      onClick={()=> handleDelete(cls._id)}
                      ><i class="bi bi-trash-fill"></i></button>
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

export default Classes
