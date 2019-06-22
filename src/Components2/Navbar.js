import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
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
                <p>Log out</p>
                <p>Profile</p>
            </ul>
        </>
    )
}
