import React, { useState, useEffect } from "react";
import CreateEmployee from "./CreateEmployee";

const EmployeeList = () => {
    const [showCreateEmployee, setShowCreateEmployee] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const fetchEmployeeData = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/employes");
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
                setFilteredEmployees(data);
            } else {
                console.error("Failed to fetch employee data");
            }
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const handleCreateEmployeeClick = () => {
        setSelectedEmployee(null);  // Reset selected employee
        setShowCreateEmployee(true);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
        filterEmployees(e.target.value);
    };

    const filterEmployees = (keyword) => {
        const filtered = employees.filter((employee) =>
            employee.name.toLowerCase().includes(keyword.toLowerCase()) ||
            employee.email.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowCreateEmployee(true);
    };

    const handleDeleteEmployee = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/employes/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchEmployeeData();
            } else {
                console.error("Failed to delete employee");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleSaveEmployee = () => {
        fetchEmployeeData(); // Refresh employee list after save
        setShowCreateEmployee(false); // Hide the form
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Employee List</h1>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                onClick={handleCreateEmployeeClick}
            >
                Create Employee
            </button>

            <div className="flex items-center justify-between mb-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded mr-2 px-2 py-1"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>
                    <span>Total Count: {filteredEmployees.length}</span>
                </div>
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Unique Id</th>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Mobile No</th>
                        <th className="px-4 py-2">Designation</th>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Course</th>
                        <th className="px-4 py-2">Create Date</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="border px-4 py-2">{employee.id}</td>
                            <td className="border px-4 py-2">{/* Image Placeholder */}</td>
                            <td className="border px-4 py-2">{employee.name}</td>
                            <td className="border px-4 py-2">{employee.email}</td>
                            <td className="border px-4 py-2">{employee.mobileNo}</td>
                            <td className="border px-4 py-2">{employee.designation}</td>
                            <td className="border px-4 py-2">{employee.gender}</td>
                            <td className="border px-4 py-2">{employee.courses.join(", ")}</td>
                            <td className="border px-4 py-2">{employee.createDate}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                    onClick={() => handleEditEmployee(employee)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => handleDeleteEmployee(employee.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showCreateEmployee && (
                <CreateEmployee
                    employee={selectedEmployee}
                    onSave={handleSaveEmployee}
                    onCancel={() => setShowCreateEmployee(false)}
                />
            )}
        </div>
    );
};

export default EmployeeList;
