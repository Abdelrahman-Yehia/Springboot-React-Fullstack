import React from "react";
import Login from "./components/Login";

import Register from "./components/Register";
import { Routes, Route} from "react-router-dom";

import HomePage from "./components/homepage/HomePage";
import Missing from "./components/Missing";
import Layout from "./components/Layout";


function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>

                {/* We want to protect these routes */}
                <Route index element={<HomePage/>}/>
            </Route>
            {/* Catch all*/}
            <Route path="*" element={<Missing />}/>
        </Routes>
    );
}

export default App;
