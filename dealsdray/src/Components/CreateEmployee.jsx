import React, { useState } from "react";

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        id: generateUniqueId(), // Automatically generate uniqueId
        name: "",
        email: "",
        mobileNo: "",
        designation: "",
        gender: "",
        courses: [],
        image: null,
        createDate: new Date().toISOString(), // Automatically set createDate
    });

    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Function to generate uniqueId
    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            if (checked) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    courses: [...prevFormData.courses, value],
                }));
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    courses: prevFormData.courses.filter((course) => course !== value),
                }));
            }
        } else if (type === "file") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: files[0],
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3001/api/employes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    console.log('Employee created successfully');
                    setFormSubmitted(true);
                } else {
                    console.error('Failed to create employee');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        if (!formData.mobileNo.trim()) {
            errors.mobileNo = "Mobile No is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            errors.mobileNo = "Mobile No is invalid";
            isValid = false;
        }

        if (!formData.designation.trim()) {
            errors.designation = "Designation is required";
            isValid = false;
        }

        if (!formData.gender) {
            errors.gender = "Gender is required";
            isValid = false;
        }

        if (formData.courses.length === 0) {
            errors.courses = "At least one course must be selected";
            isValid = false;
        }

        if (!formData.image) {
            errors.image = "Image is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Create Employee</h1>
            {formSubmitted ? (
                <div className="text-green-600 font-bold mb-4">Form submitted successfully!</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={formData.id} />
                    <input type="hidden" name="createDate" value={formData.createDate} />

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-red-500" : ""}`}
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : ""}`}
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNo">
                            Mobile No
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.mobileNo ? "border-red-500" : ""}`}
                            id="mobileNo"
                            type="text"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                        />
                        {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                            Designation
                        </label>
                        <select
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.designation ? "border-red-500" : ""}`}
                            id="designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                        >
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                        {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.gender ? "border-red-500" : ""}`}
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Courses
                        </label>
                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-gray-600"
                                    name="course"
                                    value="MCA"
                                    onChange={handleChange}
                                />
                                <span className="ml-2">MCA</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-gray-600"
                                    name="course"
                                    value="BCA"
                                    onChange={handleChange}
                                />
                                <span className="ml-2">BCA</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-gray-600"
                                    name="course"
                                    value="BSC"
                                    onChange={handleChange}
                                />
                                <span className="ml-2">BSC</span>
                            </label>
                        </div>
                        {errors.courses && <p className="text-red-500 text-xs mt-1">{errors.courses}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Image Upload
                        </label>
                        <input
                            type="file"
                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? "border-red-500" : ""}`}
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateEmployee;
