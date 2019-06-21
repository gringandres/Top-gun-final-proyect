import React from 'react';

const Achieve = ({points,name})=>{
    return(
        <figure>
            <figcaption>{points}</figcaption>    
            <figcaption>{name}</figcaption>    
        </figure>
    );
}

export default Achieve;