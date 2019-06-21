import React, { Component } from 'react'
import AchievementList from '../Container/AchievementList';
import { Link } from 'react-router-dom';


export default class achievements extends Component {
    render() {
        return (
            <>
                <h1>Achievements</h1>
                <ul>
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
                    <AchievementList />
                </div>
            </>
        )
    }
}
