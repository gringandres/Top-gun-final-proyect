import React from 'react';

const Prize = ({imgSrc,name})=>{
    return(
        <figure>
            <img src={imgSrc} alt=""/>
            <figcaption>{name}</figcaption>    
        </figure>
    );
}

export default Prize;