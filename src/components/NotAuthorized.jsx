import React from 'react'
import { Link } from 'react-router-dom'

const NotAuthorized = () => {
  return (
    <div className="access-denied-container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg text-center border-0 access-denied-card p-5">
        <div className="access-icon mb-4">
          <i className="bi bi-shield-lock-fill text-danger display-1"></i>
        </div>
        <h1 className="text-danger fw-bold mb-3">Access Denied</h1>
        <p className="text-muted mb-4">
          Sorry, you don’t have permission to view this page.
          <br />
          Please contact your administrator or return to the homepage.
        </p>
        <div>
          <Link to="/" className="btn btn-success px-4 me-2">
            Go Home
          </Link>
          <Link to="/login" className="btn btn-outline-success px-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotAuthorized
