import React, { Component } from 'react'
import AchievementList from '../Container/AchievementList';



export default class achievements extends Component {
    render() {
        return (
            <>
                <h1>Achievements</h1>
                <div>
                    <AchievementList />
                </div>
            </>
        )
    }
}
