import React from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
    display: inline-block;
    border-radius: 5px;
    overflow: hidden;
    margin: 0;
`;

const Img = styled.img`
    width: 200px;
    height: 200px;
    vertical-align: middle;
`;

const Character = styled.figcaption`
    background-color: #222;
    text-decoration: none;
    color: #fff;
    padding: 3px;
    text-align:center;
`;


const Person = ({ imgSrc, name , points }) => {
    return (
        <Figure>
            <Img src={imgSrc} alt=""/>
            <Character>{name}</Character>   
            <Character>{points}</Character>   
        </Figure>
    );
}
 
export default Person;