import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Employee() {
    const navigate = useNavigate();


    const token = localStorage.getItem('token');
    const [fullname, setName] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDOB] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");
    const HandleSubmit = async () => {
        // console.log("working");
        try {
            const headers = {
                'authorization': `Bearer ${token}`, // Replace 'your_token_here' with the actual token
                'Content-Type': 'application/json'
                // Add any other headers you need
            };

            // Send the request with the configured headers
            if (!fullname || !age || !dob || !salary || !department) {
                alert("Enter All Fields");
            } else {
                // console.log();
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Employee/add-employee`, { fullname, age, dob, salary, department }, { headers: headers });
                console.log(response);
                if (response.status == 200) {

                    alert(`Submit Successfully`)
                    navigate("/AllEmployee")
                } else {
                    console.log(response.status);
                }
            }

            // const {fullname,age, dob, salary, department}=response.data.Employee;


            // setAllemployee(response.data.employees)
            // setName(response.data.user.name); 
            // setEmail(response.data.user.email)
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    }

    return (
        <div>
            <div className='sidebar'>
                <h1>ADD EMPLOYEE</h1>
                <div className='form'>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="lable">Employee Name</label>
                        <input type="text" class="form-control" onChange={e => setName(e.target.value)} maxLength={30} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="lable">Age</label>
                        <input type="number" class="form-control" onChange={e => setAge(e.target.value)} maxLength={30} />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="lable">Date of Birth</label>
                        <input max="2005-01-01" type="date" class="form-control" onChange={e => setDOB(e.target.value)} maxLength={30} />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="lable">Salary</label>
                        <input type="number" class="form-control" onChange={e => setSalary(e.target.value)} maxLength={30} />
                    </div>

                    <select value={department} onChange={handleDepartmentChange} className='selectStyle' >
                        <option value="">Select an Department</option>
                        <option value="IT">IT</option>
                        <option value="Sales">Sales</option>
                        <option value="Production">Production</option>
                        <option value="Field">Field</option>
                        <option value="Canteen">Canteen</option>
                    </select>

                    <button onClick={HandleSubmit} class="btn btn-outline-secondary">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Employee
