import NavBar from "./components/NavBar"
import Login from "./pages/login/Login"
import NotFound from "./pages/not-found/NotFound";
import SignUp from "./pages/sign-up/SignUp";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Users from "./pages/users/Users";
import Layout from "./pages/layouts/guests/Layout";
import { ContextProvider } from "./contexts/ContextProvider";
import AdminLayout from "./pages/layouts/admin/AdminLayout";
import UserForm from "./pages/users/UserForm";
import UserUpdate from "./pages/users/UserUpdate";



function App() {

  return (
    <>
        <ContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<AdminLayout />} />
                    </Route>

                    <Route path="/users/new" element={<UserForm key='userCreate' />} />
                    <Route path="/users/:id" element={<UserUpdate />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </ContextProvider>
    </>
  )
}

export default App

