import React, {useState} from 'react'
import './App.css';
import Person from './Person/Person'

const App = props => {
    const [personState, setPersonState] = useState({
        persons: [
          {name: "Max", age: 28},
          {name: "Mane", age: 29},
          {name: "Stephanie", age: 16}
        ]
    });

    const [otherState, setOtherState] = useState({
        otherState: "Some other state"
    });

    const switchNameHandler = () => {
        setPersonState({
            persons: [
                {name: "Maximilian", age: 28},
                {name: "Mane", age: 29},
                {name: "Stephanie", age: 16}
            ]
        });
    };
    
        return (
        // this is some jsx
        <div className="App">
            <h1>HI --- TEST</h1>
            <p className="p">this is rly working</p>
            <button onClick={switchNameHandler}>Switch name</button>
            {/* using state */}
            <Person 
                name={personState.persons[0].name} 
                age={personState.persons[0].age}/>
            <Person 
                name={personState.persons[1].name} 
                age={personState.persons[1].age}/>HELLO<Person/>
            <Person 
                name={personState.persons[2].name} 
                age={personState.persons[2].age}/>
        </div>

        //its the same as:
            // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?')
        );
}

export default App;
