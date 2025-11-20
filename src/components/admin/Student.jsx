import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Student = () => {
  // Hook to hold the list of students fetched from the API
  const [students, setStudents] = useState([]);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  console.log("The students fetched from API are:", students);

  // Function to fetch students from API
  const fetchStudents = async () => {
    try {
      toast.info("Loading Students...");

      const res = await axios.get(
        "https://kindergartenapi-olyn.onrender.com/api/student",
        authHeader
      );

      setStudents(res.data.students || []);
      toast.dismiss();
    } 
    catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to load Students");
    }
  };

  // Load students when component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete this student?")) {
      try {
        toast.warning("Deleting student. Please wait...");
        await axios.delete(
          `https://kindergartenapi-olyn.onrender.com/api/student/${id}`,
          authHeader
        );

        fetchStudents(); // Refresh list
      } catch (err) {
        toast.dismiss();
        toast.error(err.response?.data?.message || "Delete failed");
      }
    }
  };

  // Edit student
  const handleEdit = (studentData) => {
    navigate("/admin-dashboard/students/edit", { state: { studentData } });
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/admin-dashboard"}>Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Students
          </li>
        </ol>
      </nav>

      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success mb-0">
            <i className="bi bi-people-fill"></i> Student List
          </h5>

          {/* Add Student Button */}
          <button
            className="btn btn-success"
            onClick={() => navigate("/admin-dashboard/students/add")}
          >
            <i className="bi bi-plus-circle"></i> Add Student
          </button>
        </div>

        {/* Students Table */}
        <div className="table-responsive">
          {students.length === 0 ? (
            <div className="alert alert-warning text-center mb-0">
              <h5>
                <i className="bi bi-patch-exclamation-fill"></i> No Student Found
              </h5>
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Admission No.</th>
                  <th>Gender</th>                  
                  <th>DOB</th>  
                  <th>Classroom</th>
                  <th>Parent</th>
                  <th>Photo</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((std, index) => (
                  <tr key={std._id}>
                    <td>{index + 1}</td>

                    <td>{std.name}</td>
                    <td>{std.admissionNumber}</td>
                    <td>{std.gender}</td>
                    <td>{new Date(std.dateOfBirth).toLocaleDateString()}</td>   
                    <td>{std.classroom?.name || "Not Assigned"}</td>
                    <td>{std.parent?.name || "No Parent"}</td>

                    {/* Photo */}
                    <td>
                      {std.photo ? (
                        <img
                          src={std.photo}
                          alt="student"
                          width="50"
                          height="50"
                          className="rounded-circle"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span className="text-muted">No Photo</span>
                      )}
                    </td>

                    <td>
                    <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(std)}
                    >
                    <i className="bi bi-pen-fill"></i> Edit
                    </button>

                    <button
                       className="btn btn-sm btn-danger"
                       onClick={() => handleDelete(std._id)}
                        >
                       <i className="bi bi-trash-fill"></i> Delete
                      </button>
                     </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
