import React from 'react';
import Radium from 'radium';

import './Person.css'
 
const person = (props) => {
    const style = {
        "@media(min-width: 500px)": {
            width: "450px"
        },
        // "@media(max-width: 800px)": {
        //     width: "750px"
        // }
    };

    return (
        // style vai dar override as css rules que tenho definidas para Person. O css faz isso e nao o radium
        <div className="Person" style={style}>
            <p onClick={props.click}>Im a person with name: {props.name} and age: {props.age}</p>
            <p>My number: {Math.floor(Math.random() * 30)}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    )
}

export default Radium(person);  