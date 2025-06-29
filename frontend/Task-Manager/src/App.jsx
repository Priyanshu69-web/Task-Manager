import React, { useContext } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Admin/Dashboard';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';

import UserDasboard from './pages/Users/UserDashboard';
import MyTask from './pages/Users/MyTask';
import ViewTaskDetails from './pages/Users/ViewTaskDetails';

import PrivateRoute from './routes/PrivateRoute';
import UserProvider, { UserContext } from './context/useContext';
import TaskProvider from './context/TaskContext';
import { ToastBar, Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <UserProvider>
      <TaskProvider>
        <div>
          <Router>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
              {/*Admin Routes*/}
              <Route element={< PrivateRoute allowedRoles={["admin"]} />}>
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/tasks' element={<ManageTasks />} />
                <Route path='/admin/create-task' element={<CreateTask />} />
                <Route path='/admin/users' element={<ManageUsers />} />
              </Route>
              {/*User Routes*/}
              <Route element={< PrivateRoute allowedRoles={["admin"]} />}>
                <Route path='/user/dashboard' element={<UserDasboard />} />
                <Route path='/user/tasks' element={<MyTask />} />
                <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
              </Route>

              {/* Default Route */}
              <Route path="/" element={<Root />} />
            </Routes>
          </Router>
        </div>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fonsize: "13px",
            },
          }}
        />
      </TaskProvider>
    </UserProvider>
  )
}
export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />

  if (!user) {
    return <Navigate to="/login" />;

  }
  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />;
};
