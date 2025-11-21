import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const StudentEdit = () => {
  const { token } = useContext(AuthContext);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Retrieve passed student data via useLocation
  const { state } = useLocation();
  const selectedStudent = state?.studentData;

  console.log("Selected student:", selectedStudent);

  // Declare hooks for student fields
  const [name, setName] = useState(selectedStudent?.name || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    selectedStudent?.dateOfBirth?.split("T")[0] || ""
  );
  const [gender, setGender] = useState(selectedStudent?.gender || "");
  const [admissionNumber, setAdmissionNumber] = useState(
    selectedStudent?.admissionNumber || ""
  );

  const [classroom, setClassroom] = useState(
    selectedStudent?.classroom?._id || ""
  );

  const [parent, setParent] = useState(selectedStudent?.parent?._id || "");

  const [photo, setPhoto] = useState(null);

  // Dropdown data
  const [classrooms, setClassrooms] = useState([]);
  const [parents, setParents] = useState([]);

  // Fetch meta data (classrooms + parents)
  const fetchMetaData = async () => {
    try {
      toast.info("Loading form data...");

      const classRes = await axios.get(
        "https://kindergartenapi-olyn.onrender.com/api/classroom",
        authHeader
      );
      setClassrooms(classRes.data.classrooms || []);

      const parentRes = await axios.get(
        "https://kindergartenapi-olyn.onrender.com/api/parent",
        authHeader
      );
      setParents(parentRes.data);

      toast.dismiss();
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to load dropdown data");
    }
  };

  useEffect(() => {
    fetchMetaData();
  }, []);

  const navigate = useNavigate();

  // Handle student update
  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    formData.append("admissionNumber", admissionNumber);
    formData.append("classroom", classroom);
    formData.append("parent", parent);

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      toast.info("Updating student details...");

      const res = await axios.put(
        `https://kindergartenapi-olyn.onrender.com/api/student/${selectedStudent._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.dismiss();
      toast.success(res.data?.message || "Student updated successfully");
      navigate("/admin-dashboard/students");
    } catch (err) {
      toast.dismiss();
      toast.error(
        err.response?.data?.message || err.message || "Error updating student"
      );
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/admin-dashboard"}>Dashboard</Link>
          </li>

          <li className="breadcrumb-item">
            <Link to={"/admin-dashboard/students"}>Students</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Edit Student
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-4 text-success">
            <i className="bi bi-pencil-square"></i> Edit Student Details
          </h5>

          <Link className="btn btn-success" to={"/admin-dashboard/students"}>
            <i className="bi bi-box-arrow-in-left"></i> Back
          </Link>
        </div>

        <form onSubmit={handleEdit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                placeholder="Enter Student Name"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="date"
                className="form-control"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                placeholder="Enter Admission Number"
                className="form-control"
                required
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                required
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
              >
                <option value="">Select Classroom</option>
                {classrooms?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                required
                value={parent}
                onChange={(e) => setParent(e.target.value)}
              >
                <option value="">Select Parent</option>
                {parents?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>

          <button className="btn btn-outline-success" type="submit">
            <i className="bi bi-floppy2"></i> Update Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentEdit;
