import React from 'react';

const Person = ({ imgSrc, name }) => {
    return (
        <figure>
            <img src={imgSrc} alt=""/>
            <figcaption>{name}</figcaption>    
        </figure>
    );
}
 
export default Person;