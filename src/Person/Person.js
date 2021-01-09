import React from 'react';
import styled from 'styled-components';
 

// styled.div is a function that already returns a valid react component so we dont need to do StyledDiv = props => ... cus that would be creating a component.

// every method provided by the styled object returns a react component

// the styles we set up here are not added as in-line styles but ismstead the styled-components package takes them, puts them in css class selectors, and adds them to the head of document, and then adds the appropriate css class to the div that is returned by this component
const StyledDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width: 500px) {
        width: 450px;
    }
`;

const person = (props) => {
    return (
        // style vai dar override as css rules que tenho definidas para Person. O css faz isso e nao o radium
        <StyledDiv>
            <p onClick={props.click}>Im a person with name: {props.name} and age: {props.age}</p>
            <p>My number: {Math.floor(Math.random() * 30)}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </StyledDiv>
    )
}

export default person;  