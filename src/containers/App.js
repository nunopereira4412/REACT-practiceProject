import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './app.module.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux.js';
import Person from '../components/Persons/Person/Person';

import AuthContext from '../context/authContext';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      {id: "sdfsdf", name: "Max", age: 28},
      {id: "whgesfdv", name: "Mane", age: 29},
      {id: "wetragds", name: "Stephanie", age: 16}
    ],
    otherState: "this is other state",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate...");
    return true;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount" );
  }

  componentDidUpdate(prevProp, prevState, snapshot) {
    console.log("[App.js] componentDidUpdate...");
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
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  deletePersonHandler = (personIndex) => {     
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log("[App.js] render");
    let persons = null;

    if(this.state.showPersons) { 
      persons = <Persons 
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangedHandler}/>
    }

    return (
      // this is some jsx
      <Aux>
        <button 
          onClick={() => {
            this.setState({showCockpit: false})
          }}>
          Remove Cockpit
        </button>
        <AuthContext.Provider 
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          {this.state.showCockpit ? 
            <Cockpit 
              appTitle={this.props.appTitle}
              personsLength={this.state.persons.length}
              showPersons={this.state.showPersons}
              clicked={this.togglePersonsHandler}
            /> : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    //its the same as:
      // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?')
  }  
}

// propTypes is a special propertie which i had to any js component object that react will watch out for in dev mode and give a warning if theres any incorrect props. 
// I now define which props the component uses and which type of data this component should be of.

// I can even say a prop should be a function that receives this and that argument and returns that
Person.propTypes = {
  clicked: PropTypes.func,
  changed: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number
};

export default withClass(App, classes.App);
