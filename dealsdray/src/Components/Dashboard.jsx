// Dashboard.js

import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import CreateEmployee from "./CreateEmployee";

const Dashboard = ({ onLogout }) => {
    return (
        <div>
            <Navbar onLogout={onLogout} />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<h1 className="text-3xl font-bold mb-4">Dashboard</h1>} />
                    <Route path="/employee-list" element={<EmployeeList />} />
                    <Route path="/create-employee" element={<CreateEmployee />} />
                </Routes>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Dashboard;
