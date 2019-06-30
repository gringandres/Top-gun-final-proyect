import React from 'react'
import styled from 'styled-components';
import EmployeesList from '../Container/EmployeesList';

const Title = styled.h1`
    display: flex;
    flex-wrap: wrap;
    margin-left: 43%;
    margin-top: 20px;
    font-weight: bold;
    font-family:"Times New Roman", Times, serif;
    color: #62E52C;
`;


export default function employees() {
    return (
        <>
            <Title>Employees</Title>
            <div>
                <EmployeesList />
            </div>
        </>
    )
}
