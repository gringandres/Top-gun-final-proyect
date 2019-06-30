import React, { Component } from 'react'
import PrizesList from '../Container/PrizesList';
import styled from 'styled-components';

const Title = styled.h1`
    display: flex;
    flex-wrap: wrap;
    margin-left: 46%;
    margin-top: 20px;
    font-weight: bold;
    font-family:"Times New Roman", Times, serif;
    color: #62E52C;
`;

export default class prizes extends Component {
    render() {
        return (
            <>
                <Title>Prizes</Title>
                <div>
                    <PrizesList />
                </div>

            </>
        )
    }
}
