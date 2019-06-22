import React from 'react';

const Person = ({ imgSrc, name , points }) => {
    return (
        <figure>
            <img src={imgSrc} alt=""/>
            <figcaption>{name}</figcaption>   
            <figcaption>{points}</figcaption>   
        </figure>
    );
}
 
export default Person;