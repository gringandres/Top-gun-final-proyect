import React, { Component } from 'react'
import AchievementList from '../Container/AchievementList';
import Navbar from '../Components2/Navbar';


export default class achievements extends Component {
    render() {
        return (
            <>
                <h1>Achievements</h1>
                <Navbar />
                <div>
                    <AchievementList />
                </div>
            </>
        )
    }
}
