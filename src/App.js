import './App.css';
import Navbar from "./components/Navbar";
import {useState} from "react";
import UserList from "./components/users/UserList";

function App() {
    return (
        <div className="container">
            <Navbar/>


            <UserList/>
        </div>
    );
}

export default App;
