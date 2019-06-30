import React from 'react';
import styled from 'styled-components';


const Character = styled.h2`
    margin-top: 16px;
    
`;

const NamePerson = styled.h2`
    background-color: #253746;
    text-decoration: whitesmoke;
    color: #62E52C;
    text-align: center;
    font-size: 18px;
    height: 30px;
    border-radius: 10px; 
    text-transform: capitalize;
`;

const CharacterP = styled.span`
    padding: 5px;
    margin: 0;
    font-size: 25px;
`;

const Figure = styled.div`
    height: 190px;
    width: 100%;
    position: relative;
    overflow: hidden;
    -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
    -webkit-transition: all 0.7s linear;
    transition: all 0.7s linear;
    border: 6px solid #253746;
    border-radius: 10px; 
    
    :hover{
        -webkit-transform: rotateX(-180deg);
        transform: rotateX(-180deg);
  }
`;

const Content = styled.div`
    text-align: center;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    top: 0;
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
    opacity: 0;
    color: white;
    height: 100%;
    width: 100%;

    :hover{
        background: rgba(37, 55, 70, 0.6);
        opacity: 1;
        
    }
`;

const Img = styled.img`
    width: 100%;
    height:auto;
`;

const Person = ({ imgSrc, name, points }) => {
    return (
        <>
            <Figure>
                <Img src={imgSrc} alt="" />
                <Content>
                    <Character>{name}</Character>
                    <CharacterP>⭐️{points}</CharacterP>
                </Content>
            </Figure>
            <NamePerson>{name}</NamePerson>
        </>
    );
}

export default Person;