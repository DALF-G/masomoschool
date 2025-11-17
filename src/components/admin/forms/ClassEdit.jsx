import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

const ClassEdit = () => {
    const {token} = useContext(AuthContext)
    const authHeader = {
    headers : {Authorization : `Bearer ${token}`}
  }
    // To retrive the passed info/data from previous component, we use the use location hook
    const {state} = useLocation()
    const selectedClass = state?.classData

    // console.log("The selected class details are", selectedClass)
     // Declare the hooks to enable you store values
      const[name, setName] = useState(selectedClass.name);
      const[gradeLevel, setGradeLevel] = useState(selectedClass.gradeLevel)
      const[classYear, setClassYear] = useState(selectedClass.classYear);

    //   add two additional hooks for fetching all teachers, another for fetching specific teacher
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");

    // Create a function which will fetch all the teachers from the database
    const fetchTeachers = async () =>{
        try{
            toast.info("Loading teachers...")

            const res = await axios.get("https://kindergartenapi-olyn.onrender.com/api/teacher", authHeader)
            // console.log("The details of the fetched teachers are:", res.data)
            setTeachers(res.data)
        }
        catch(err){
            toast.dismiss()
            toast.error(err.response.data.message || "Failed to load teachers")
        }
    }

    // Use the useEffect hook that automatically invikes the function fetchteachers
    useEffect(()=>{
        fetchTeachers()
    }, [])

    //   Declare the navigate hooks
    const navigate = useNavigate();

    //   Declare a function to handle the edit action
    const handleEdit = async (e) => {
        e.preventDefault();
    
        const data = { name, gradeLevel, classYear };
    
        try {
            toast.info("Please wait as we update the class details...");
    
            const res = await axios.put(
                `https://kindergartenapi-olyn.onrender.com/api/classroom/${selectedClass._id}`,
                data,
                authHeader
            );
    
            toast.dismiss();
            toast.success(res.data?.message || "Class details updated successfully");
            navigate("/admin-dashboard/classes");
        } catch (err) {
            toast.dismiss();
    
            const msg =
                err.response?.data?.message ||
                err.message ||
                "Error Updating the Class";
    
            toast.error(msg);
        }
    };
    

  return (
    <div className='container mt-2'>

    <ToastContainer position='top-right' autoClose={3000}/>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to={"/admin-dashboard"}>Dashboard</Link></li>

        <li class="breadcrumb-item" aria-current="page"><Link to={"/admin-dashboard/classes"}>Classes</Link></li>

        <li class="breadcrumb-item active" aria-current="page">Edit Class</li>
      </ol>
    </nav>

    <div className="card p-4 shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-4 text-success">
              <i class="bi bi-pencil-square"></i> Edit Class Details
              </h5>
              <Link className="btn btn-success" to={"/admin-dashboard/classes"}>
              <i className="bi bi-box-arrow-in-left"></i>
              Back</Link>
            </div>

            <form onSubmit={handleEdit}>
            <div className="row">
          <div className="col-md-6 mb-3">
            <input type='text'
            placeholder='Enter the class Name here'
            className='form-control'
            required
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />  
            {/* {name}           */}
          </div>

          <div className="col-md-6 mb-3">
            <input type='text'
            placeholder='Enter Gradeb Level here i.e 1, 2, 3, 4.....'
            className='form-control'
            required
            value={gradeLevel}
            onChange={(e)=>setGradeLevel(e.target.value)}
            />   
            {/* {gradeLevel}          */}
          </div>

          <div className="col-md-6 mb-3">
            <input type='number'
            placeholder='Enter the Class Year here'
            className='form-control'
            required
            value={classYear}
            onChange={(e)=>setClassYear(e.target.value)}             
            />
            {/* {classYear}             */}
          </div>

          <div className="col-md-6 mb-3">
            <select
            className='form-control'
            required
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}>
                <option value="">Select Your Teacher</option>
                {teachers.map((teacher, index)=>(
                    <option key={teacher._id} value={teacher._id}>{`${teacher.name}, ${teacher.subject}`}</option>
                ))}
            </select>
          </div>

        </div>
        <button className="btn btn-outline-success" type='submit'>
        <i class="bi bi-floppy2"></i> Update Class
          </button>
            </form>
    </div>

    </div>
  )  
}

export default ClassEdit
