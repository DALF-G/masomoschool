import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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
import ClassAdd from './components/admin/forms/ClassAdd';
import ClassEdit from './components/admin/forms/ClassEdit';
import TeacherEdit from './components/admin/forms/TeacherEdit'
import TeacherAdd from './components/admin/forms/TeacherAdd';
import ParentEdit from './components/admin/forms/ParentEdit';
import ParentAdd from './components/admin/forms/ParentAdd';
import StudentAdd from './components/admin/forms/StudentAdd';
import StudentEdit from './components/admin/forms/StudentEdit';

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
        <Route path='teachers/edit' element={<TeacherEdit/>} />
        <Route path='teachers/add' element={<TeacherAdd/>} />
        <Route path='parents' element={<Parents/>} />
        <Route path='parents/edit' element={<ParentEdit/>} />
        <Route path='parents/add' element={<ParentAdd/>} />
        <Route path='classes' element={<Classes/>} />
        <Route path='classes/add' element={<ClassAdd/>} />
        <Route path='classes/edit' element={<ClassEdit/>} />
        <Route path='students' element={<Student/>} />
        <Route path='students/add' element={<StudentAdd/>} />
        <Route path='students/edit' element={<StudentEdit/>} />
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
