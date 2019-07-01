import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Font Awesome
const Burger = <FontAwesomeIcon icon={faEllipsisH} />
const X = <FontAwesomeIcon icon={faTimes} />

//remove Blue line of Link
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    :hover{
        color: #62E52C;
    }
    &:focus{
        color: #62E52C;

    }
`;

//NaveBar
const Header = styled.div`
    font-family: "montserrat",sans-serif;
    height: 100px;
    background: #253746;
    padding: 0 20px;
    color: #fff;
`;
const Logo = styled.img`
    line-height: 100px;
    float: left;
    width: 80px;
    height:80px;
    margin-top: 10px;
    margin-left: 20px;
`;

const ShowBar = styled.label`
    transition: 0.4s;
    font-size: 30px;
    float: right;
    cursor: pointer;
    display: none;

    @media screen and (max-width:768px){
        display: block;
    }
`;
const HideBar = styled.label`
    transition: 0.4s;
    font-size: 30px;
    cursor: pointer;
    display: none;

    @media screen and (max-width:768px){
        display: block;
        position: absolute;
        top: 10px;
        right: 40px;
    }
`;

const MenuBar = styled.ul`
    float: right;
    line-height: 100px;

    @media screen and (max-width:768px){
        position: absolute;
        width: 100%;
        height: 10%;
        background: #253746;
        right: -100%;
        top: 0;
        padding: 80px 0;
        transition: 0.7s;
        transition:none;
    }
`;

const Barrs = styled.i`
    line-height: 100px;
    color: #62E52C;
`;

const CheckBoxNav = styled.input`
    float: right;
    visibility: hidden;
    z-index: -1111;   
    &:checked ~ ${MenuBar} {
       right:0;
    }
`;

const List = styled.a`
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0 10px;

    @media screen and (max-width: 768px){
        margin:left;
        padding: 5px;
        margin-left: 20px;
    }
    @media screen and (max-width: 576px){
        margin:left;
        padding: 10px;
        font-size: 10px;
    }
`;

const CloseNav = styled.i`
    :hover {
        color: #62E52C;
    }
 `;

export default function Navbar() {
    return (
        <>
            <Header>
                <Logo src={logo}></Logo>
                <CheckBoxNav type="checkbox" id="chk" />
                <ShowBar for="chk">
                    <Barrs>{Burger}</Barrs>
                </ShowBar>
                <MenuBar>
                    <StyledLink to={`/employees`}>
                        <List>Employee</List>
                    </StyledLink>
                    <StyledLink to={`/prizes`}>
                        <List>Prizes</List>
                    </StyledLink>
                    <StyledLink to={`/achievements`}>
                        <List>Achievements</List>
                    </StyledLink>
                    <List>Profile</List>
                    <List>Log out</List>
                    <HideBar for="chk">
                        <CloseNav>{X}</CloseNav>
                    </HideBar>
                </MenuBar>
            </Header>
        </>
    )
}
