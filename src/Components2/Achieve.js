import React from 'react';
import styled from 'styled-components';

const Figured = styled.figure`
    display: flex;
    align-content: center;
    flex-direction: column;
    margin: 5px 15% 5px 15%;
`;

const Info = styled.figcaption`
    text-align:center;
    color: #62E52C;
    background-color: #253746;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    text-transform: capitalize;
`;

const Achieve = ({points,name})=>{
  

    return(
        <Figured>
            <Info>{name}</Info>    
            <Info>⭐️{points}</Info>  
        </Figured>
    );
}

export default Achieve;