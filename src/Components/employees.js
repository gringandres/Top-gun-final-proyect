import React from 'react'
import styled from 'styled-components';
import EmployeesList from '../Container/EmployeesList';

const Title = styled.h1`
    text-align:center;
    margin-top:10px;
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
