import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarAll = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: black;
    height: 80px;
`;

const ListItemsNavBar = styled.li`
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;

    :hover {
        -webkit-text-fill-color: green;
    }
`;

const RightItemNavBar = styled(ListItemsNavBar)`
    float: right;
`;

export default function Navbar() {
    return (
        <>
            <NavBarAll className="navBar" id="navBar">
                <ListItemsNavBar><p>TEAM Int</p></ListItemsNavBar>
                <Link to={`/employees`}>
                    <ListItemsNavBar><p>Employees</p></ListItemsNavBar>
                </Link>
                <Link to={`/prizes`}>
                    <ListItemsNavBar><p>Prizes</p> </ListItemsNavBar>
                </Link>
                <Link to={`/achievements`}>
                    <ListItemsNavBar><p>Achievements</p> </ListItemsNavBar>
                </Link>
                <RightItemNavBar><p>Log out</p></RightItemNavBar>
                <RightItemNavBar><p>Profile</p></RightItemNavBar>
            </NavBarAll>
        </>
    )
}
