import React, { Component } from 'react'
import PrizesList from '../Container/PrizesList';
import { Link } from 'react-router-dom';


export default class prizes extends Component {
    render() {
        return (
            <>
                <h1>Prizes</h1>
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
                    <PrizesList />
                </div>

            </>
        )
    }
}
