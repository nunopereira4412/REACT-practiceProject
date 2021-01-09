import React from 'react';
import classes from './person.module.css';
 
const person = (props) => {

    let x = Math.random();

    if(x > 0.7) {
        throw new Error("Something went wrong");
    }

    return (
        // style vai dar override as css rules que tenho definidas para Person. O css faz isso e nao o radium
        <div className={classes.Person}>
            <p onClick={props.click}>Im a person with name: {props.name} and age: {props.age}</p>
            <p>My number: {Math.floor(Math.random() * 30)}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    )
}

export default person;  