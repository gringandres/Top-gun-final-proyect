import React, { Component } from 'react'
import AchievementList from '../Container/AchievementList';
import styled from 'styled-components';

const Title = styled.h1`
    text-align:center;
    margin-top:10px;
`;

export default class achievements extends Component {
    render() {
        return (
            <>
                <Title>Achievements</Title>
                <div>
                    <AchievementList />
                </div>
            </>
        )
    }
}
