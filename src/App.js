import React, {Component} from 'react';
import Person from './Person/Person';
import classes from './app.module.css';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';


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
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;
    
    let buttonClasses = "";

    if(this.state.showPersons) { 
      persons = (
        <div>
          {this.state.persons.map((person, personIndex) => {
            return (
              <ErrorBoundary key={person.id}>
                <Person
                click={() => this.deletePersonHandler(personIndex)}
                name={person.name} 
                age={person.age} 
                // key is used by react to compare future elements with past elements and then only re-render the elements that changed - efficiency
                // index isnt a good key cus for every render the indexes change
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
              </ErrorBoundary>
            )
          })}
        </div>
      );
      buttonClasses = classes.Red;
    }


    const assignedClasses = [];
    if(this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      // this is some jsx
      <div className={classes.App}>
        <h1>HI --- TEST</h1>
        <p className={assignedClasses.join(" ")}>this is rly working</p>
        <button className={buttonClasses} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
      //its the same as:
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?')
    );
  } 
}
export default App;
