import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/"
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import Homecomponent from './components/Homecomponent';
import Registercomponent from './components/Registercomponent';
import Logincomponent from './components/Logincomponent';
import Notfound from './components/Notfound';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './context/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import TeacherLayout from './components/teacher/TeacherLayout';
import ParentLayout from './components/parent/ParentLayout';
import ParentDashboard from './components/parent/ParentDashboard';
import NotAuthorized from './components/NotAuthorized';
import Student from './components/admin/Student';
import Classes from './components/admin/Classes';
import Parents from './components/admin/Parents';
import Teachers from './components/admin/Teachers';
function App() {
  return (
    <Router>
      <AuthProvider>
     <Routes>
       <Route path='/' element={<Homecomponent/>} />

       {/* Below are the admin routes */}
       <Route path='/admin-dashboard'
       element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout/>
        </ProtectedRoute>
       }
       >
        <Route path='' element={<AdminDashboard/>} />
        <Route path='teachers' element={<Teachers/>} />
        <Route path='parents' element={<Parents/>} />
        <Route path='students' element={<Student/>} />
        <Route path='classes' element={<Classes/>} />
       </Route>

       {/* Below are the teacher routes */}
       <Route path='/teacher-dashboard'
       element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout/>
        </ProtectedRoute>
       }
       >
        <Route path='' element={<TeacherDashboard/>} />
       </Route>

            {/* Below are the parent routes */}
       <Route path='/parent-dashboard'
       element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentLayout/>
        </ProtectedRoute>
       }
       >
        <Route path='' element={<ParentDashboard/>} />
       </Route>

       <Route path='/register' element={<Registercomponent/>}/>
       <Route path='/login' element={<Logincomponent/>} />

       {/* Defaults */}
       <Route path='/not-authorized' element={<NotAuthorized/>} />

       <Route path='*' element={<Notfound/>} />
     </Routes>
     </AuthProvider>
    </Router>
  );
}

export default App;
