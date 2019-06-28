import React, { Component } from 'react'
import PrizesList from '../Container/PrizesList';
import styled from 'styled-components';

const Title = styled.h1`
    text-align:center;
    margin-top:10px;
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
