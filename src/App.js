import './App.css';
import {Navigate, Route, Router, Routes} from "react-router";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import UserList from "./components/todos/UserList";
import Layout from "./components/layouts/Layout";
import UserDetail from "./components/users/UserDetail";
import UserGithub from "./components/githubs/UserGihub";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (
        <div className="container">
            <Routes>

                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element={<Login/>}/>

                <Route exact path="/admin" element={<Layout/>}>
                    <Route exact path="github" element={<UserGithub/>}/>
                    <Route
                        path=""
                        element={ <Navigate to="users" /> }
                    />
                    <Route exact path="users" element={<UserList/>}/>
                    <Route exact path="users/:id" element={<UserDetail/>}/>
                </Route>


            </Routes>
            <ToastContainer/>
        </div>
    );
}

export default App;
