import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
  // create a hook that will contain all the response given by the endpoint 

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
    totalClassrooms: 0,
    activeUsers: 0,
    recentStudents: [],
    recentTeachers: []

  })

    const fetchStats = async () =>{
      // get the token from the localstorage
      const token = localStorage.getItem("token");
      try{
        const res = await axios.get("https://kindergartenapi-olyn.onrender.com/api/adminstats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(res.data);
        setStats(res.data);
        
      }
      catch(err){
        console.error("Failed to laod stats:", err);
      }
     
    }


    useEffect(() => {
   
      // self invoke function
      fetchStats()
    
  }, []);



  return (
    <div className="container my-2">
      <h2 className="text-center text-success mb-2">Admin Dashboard Overview</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Teachers */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-primary text-white mb-3">
              <i class="bi bi-people-fill fs-3"></i>
              </div>
              <h6 className="text-muted">Teachers</h6>
              <h2 className="fw-bold text-dark">{stats.totalTeachers}</h2>
            </div>
          </div>
        </div>

        {/* Students */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-primary text-white mb-3">
              <i class="bi bi-people-fill fs-3"></i>
              </div>
              <h6 className="text-muted">Students</h6>
              <h2 className="fw-bold text-dark">{stats.totalStudents}</h2>
            </div>
          </div>
        </div>

        {/* Classes */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-primary text-white mb-3">
              <i class="bi bi-building fs-3"></i>
              </div>
              <h6 className="text-muted">Classes</h6>
              <h2 className="fw-bold text-dark">{stats.totalClassrooms}</h2>
            </div>
          </div>
        </div>

        {/* Active users */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-primary text-white mb-3">
              <i class="bi bi-people-fill fs-3"></i>
              </div>
              <h6 className="text-muted">Total Active Users</h6>
              <h2 className="fw-bold text-dark">{stats.activeUsers}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Recently added Teachers */}
      <div className="mt-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h5><i className="bi bi-person-lines-fill me-2"></i> Recent Teachers</h5>
          </div>
          <div className="card-body">
            {stats.recentTeachers.length === 0 ? (
              <p className="text-muted">No recent teachers.</p>
            ) : (
              <ul className="list-group">
                {stats.recentTeachers.map((teacher, index) => (
                  <li key={index} className="list-group-item">
                    {teacher.name} – {teacher.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Recent Students */}
<div className="mt-5">
  <div className="card shadow-lg">
    <div className="card-header bg-primary text-white">
      <h5><i className="bi bi-person-lines-fill me-2"></i> Recent Students</h5>
    </div>

    <div className="card-body">
      {stats.recentStudents.length === 0 ? (
        <p className="text-muted">No recent students.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Admission No.</th>
                <th>Gender</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentStudents.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={student.photo}
                      alt="student"
                      width="50"
                      height="50"
                      className="rounded-circle"
                      style={{ objectFit: "cover" }}
                    />
                  </td>

                  <td>{student.name}</td>
                  <td>{student.admissionNumber}</td>
                  <td>{student.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</div>

    </div>
  )
}

export default AdminDashboard
