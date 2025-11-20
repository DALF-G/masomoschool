import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Parents = () => {
  // Below we have classes hooks that stalls all the classes fetched from the API
  const [parents, setParents] = useState([]);
  const {token} = useContext(AuthContext)

  const navigate = useNavigate();
  
  const authHeader = {
    headers : {Authorization : `Bearer ${token}`}
  }

  console.log("The parents fetched from API are:", parents)

  // Below is the funcyion that shall enable us to fetch the classes from the Api
  const fetchParents = async ()=>{
    try{
      toast.info('Loading Parents...')

      const res = await axios.get("https://kindergartenapi-olyn.onrender.com/api/parent", authHeader)
      
      // By use of the setClasses function update the classes hook with the data received from the API
      setParents(res.data)

      // Finally dismis the toast
      toast.dismiss()
    }
    catch(err){
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to load Parents")
    }
  }

  // We shall use the useEffect hook which involkes itself aoutomatically whwnever a person lands on that component. the useEffect hook, will invoke for the fetchclasses function declared on top.
  useEffect(()=>{
    fetchParents()
  }, [])

  // Below is the function to add the delete function
  const handleDelete = async (id)=>{
    if(window.confirm("Do you really want to delete this parent?")){
      try{
        toast.warning("Deleting Parent. please wait..")
        await axios.delete(`https://kindergartenapi-olyn.onrender.com/api/parent/${id}`, authHeader)

        //after deleting the class use the fetchclasses()function to retrive the new list of classes
        fetchParents()
      }
      catch(err){
        toast.dismiss()
        toast.error(err.response.data.message)
      }
    }
  }

  // Declare a function to handle what happens when the edit button is clicked
  const handleEdit = (parentData) =>{
    navigate("/admin-dashboard/parents/edit", {state : {parentData}})
  }

  return (
    <div className='container mt-2'>
      <ToastContainer position='top-right' autoClose={3000}/>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to={"/admin-dashboard"}>Dashboard</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Parents</li>
        </ol>
      </nav>

      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success mb-0">
          <i class="bi bi-houses"></i> Parent List
          </h5>

          {/* Below is the button to add parent */}
          <button className="btn btn-success" onClick={()=> navigate("/admin-dashboard/parents/add")}>
          <i class="bi bi-plus-circle"></i>
            Add parent
          </button>
        </div>

        {/* Below we populate the parents inside a table by use of the map function */}
        <div className="table-responsive">
          {parents.length === 0 ?(
            <div className="alert alert-warning text-center mb-0">
            <h5><i class="bi bi-patch-exclamation-fill"></i>  Not parent Found</h5>
            </div>
          ):(
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>National I.D</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((cls, index) =>(
                  <tr key={cls._id}>
                    <td>{ index + 1 }</td>
                    <td>{ cls.name }</td>
                    <td>{ cls.email }</td>
                    <td>{ cls.phone }</td>
                    <td>{ cls.nationalId }</td>
                    <td>{ cls.address }</td>
                    <td>
                      <button className='btn btn-sm btn-warning me-2'onClick={()=> handleEdit(cls)}><i class="bi bi-pen-fill"
                      ></i>Edit</button>

                      <button className='btn btn-sm btn-danger me-2'
                      onClick={()=> handleDelete(cls._id)}
                      ><i class="bi bi-trash-fill"></i>Delete</button>
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

export default Parents
