import React from 'react';

const Prize = ({imgSrc,name,points})=>{
    return(
        <figure>
            <img src={imgSrc} alt=""/>
            <figcaption>{name}</figcaption>   
            <figcaption>{points}</figcaption>  
        </figure>
    );
}

export default Prize;