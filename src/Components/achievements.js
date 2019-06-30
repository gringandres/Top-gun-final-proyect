import React, { Component } from 'react'
import AchievementList from '../Container/AchievementList';
import styled from 'styled-components';

const Title = styled.h1`
    display: flex;
    flex-wrap: wrap;
    margin-left: 42%;
    margin-top: 20px;
    font-weight: bold;
    font-family:"Times New Roman", Times, serif;
    color: #62E52C;
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
