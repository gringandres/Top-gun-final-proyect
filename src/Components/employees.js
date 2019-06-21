import React from 'react'
import { Link } from 'react-router-dom';
import EmployeesList from '../Container/EmployeesList';


export default function employees() {
    return (
        <>
            <h1>Employees</h1>
            <ul className="navBar" id="navBar">
                <li><p>TEAM Int</p></li>
                <Link to={`/employees`}>
                    <li><p>Employees</p></li>
                </Link>
                <Link to={`/prizes`}>
                    <li><p>Prizes</p> </li>
                </Link>
                <Link to={`/achievements`}>
                    <li><p>Achievements</p> </li>
                </Link>
                <p>Profile</p>
                <p>Log out</p>
            </ul>
            <div>
                <EmployeesList />
            </div>

        </>
    )
}
