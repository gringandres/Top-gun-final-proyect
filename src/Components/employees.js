import React from 'react'
import Navbar from '../Components2/Navbar';
import EmployeesList from '../Container/EmployeesList';


export default function employees() {
    return (
        <>
            <h1>Employees</h1>
            <Navbar />
            <div>
                <EmployeesList />
            </div>
        </>
    )
}
