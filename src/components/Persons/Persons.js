import React, {PureComponent} from 'react';
import Person from './Person/Person';


// PureComponent already implements a shouldComponentUpdate that checks for updates on all the properties this receives. This way i can save some code
class Persons extends PureComponent {
    
    state = {};

    static getDerivedStateFromProps(props, state) {
    console.log("[Persons.js] getDerivedStateFromProps...");
        return state;
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[Persons.js] shouldComponentUpdate...");
    //     if(nextProps.persons !== this.props.persons ||
    //        nextProps.clicked !== this.props.clicked ||
    //        nextProps.changed !== this.props.changed)
    //         return true;
    //     else return false;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("[Persons.js] getSnapshotBeforeUpdate...");
        return {message: "Snapshot!"};
    }
    
    componentDidUpdate(prevProp, prevState, snapshot) {
        console.log("[Persons.js] componentDidUpdate...");
        console.log(snapshot);
    }
    
    // run any code before the component is removed from the DOM
    componentWillUnmount() {
        console.log("[Persons.js] componentWillUnmount...");
    }

    render() {
        console.log("[Persons.js] rendering...");
        return this.props.persons.map((person, personIndex) => (
        <Person
            clicked={(personIndex) => this.props.clicked(personIndex)}
            name={person.name} 
            age={person.age} 
            // key is used by react to compare future elements with past elements and then only re-render the elements that changed - efficiency
            // index isnt a good key cus for every render the indexes change
            key={person.id}
            changed={(event) => this.props.changed(event, person.id)}/>
        ))
    }
};

export default Persons;

