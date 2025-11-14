import React from 'react'
import { Link } from 'react-router-dom'

const Parents = () => {
  return (
    <div className='container mt-2'>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to={"/admin-dashboard"}>Dashboard</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Parents</li>
        </ol>
      </nav>
    </div>
  )
}

export default Parents
