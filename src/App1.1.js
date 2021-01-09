import React, {Component} from 'react'
import './App.css'
import Person from './Person/Person'


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
    this.setState({
      showPersons: !showPersons
    });
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {name: "Max", age: 28},
        {name: event.target.value, age: 29},
        {name: "Stephanie", age: 16}
      ]
    });
  }

  deletePersonHandler = (index) => {     
    // without the slice we would be mutating the oritignal state. This may lead to unpredictable apps

    //const persons = this.state.persons.slice();

    // OR
    //returns an object with the elements from the oritignal 
    const persons = [...this.state.persons];

    persons.splice(index, 1);
    this.setState({
      persons: persons
    });
  }

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null;

    if(this.state.showPersons) { 
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              // key is used by react to compare future elements with the current elements and then only re-render the elements that changed
              // index isnt a good key cus for every render the indexes change
              key={person.id}/>
            )
          })}
        </div>
      );  
    }

    return (
      // this is some jsx
      <div className="App">
        <h1>HI --- TEST</h1>
        <p className="p">this is rly working</p>
        {/* <button onClick={() => this.switchNameHandler("Maximilian")}>Switch name</button> */}
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Switch name
        </button>
        {persons}
      </div>
      //its the same as:
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?')
    );
  }
}

export default App;
