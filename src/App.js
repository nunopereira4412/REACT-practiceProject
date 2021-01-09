import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';

// this with the `` is called a template literal. Its regular js which in the end creates a string where we can dynamically inject content
const StyledButton = styled.button`
  background-color: ${props => props.alt ? "red" : "green"};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.alt ? "salmon" : "lightgreen"};
    color: black;
  }
`;

class App extends Component {
  state = {
    persons: [
      {id: "sdfsdf", name: "Max", age: 28},
      {id: "whgesfdv", name: "Mane", age: 29},
      {id: "wetragds", name: "Stephanie", age: 16}
    ],
    otherState: "this is other state",
    showPersons: false
  }

  togglePersonsHandler = () => {
    const showPersons = this.state.showPersons;
    this.setState({ showPersons: !showPersons });
  }

  nameChangedHandler = (event, personId) => {
    const personIndex = this.state.persons.findIndex(p => p.id === personId);
  
    const person = {...this.state.persons[personIndex]};
    // OR
    // const person = Object.assign({}, ...this.state.persons[personIndex]);
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {     
    // without the slice we would be mutating the oritignal state. This may lead to unpredictable apps

    //const persons = this.state.persons.slice();

    // OR
    //returns an object with the elements from the oritignal 
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;
    
    if(this.state.showPersons) { 
      persons = (
        <div>
          {/* 1. map offers each element in the array asweel as its index if i want
          2. this will in the end be an array of jsx elements but react will pull out those elements from the array and render them into the screeen */}
          {this.state.persons.map((person, personIndex) => {
            return (
              <Person
              click={() => this.deletePersonHandler(personIndex)}
              name={person.name} 
              age={person.age} 
              // key is used by react to compare future elements with past elements and then only re-render the elements that changed - efficiency
              // index isnt a good key cus for every render the indexes change
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
            )
          })}
        </div>
      );
    }

    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push("red");
    }
    if(this.state.persons.length <= 1) {
      classes.push("bold");
    }

    return (
      // this is some jsx
      <div className="App">
        <h1>HI --- TEST</h1>
        <p className={classes.join(" ")}>this is rly working</p>
        {/* <button onClick={() => this.switchNameHandler("Maximilian")}>Switch name</button> */}
        <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </StyledButton>
        {persons}
      </div>
      //its the same as:
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?')
    );
  }
}
export default App;
