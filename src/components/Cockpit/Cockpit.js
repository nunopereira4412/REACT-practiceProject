«import React, {useEffect, useRef, useContext} from 'react';
import classes from './cockpit.module.css';

import AuthContext from '../../context/authContext';

const Cockpit = (props) => {
    const toggleButtonRef = useRef(null);

    const authContext = useContext(AuthContext);

    // if there are dependencies specified, useEffect executes whenever a dependencie change.
    // can use as many useEffect as i want, for different actions/readability
    
    // the below useEffect will only execute upon mounting and unmounting. Cus there are no dependencies specificed, no dependencies will change meaning this will never execute again after the 1st time

    // ONLY RUNS AFTER THE JSX CODE ON THE RETURN IS PARSED AND RENDERED FOR THE 1ST TIME(like componentDidMount of the component lifecycle for class components)

    //about return,
        // if there is an empty array, [], meaning no dependencies specified,
            // runs after they are updated - this will run BEFORE the main part of useEffect function runs but AFTER the 1st render cycle

            // the return body here is useful if theres some operation that should be cancelled whenever the component re-renders

        // if there is an array with dependencies in it, then it will do the above when those dependencies change 

        // if there is no array at all,
            // runs every time
        
        // for both cases, when the Cockpit component is removed, this is run

    useEffect(() => {
        // useState() - can do the same as getDerivedStrateFromProps
        console.log("[Cockpit.js] useEffect 1");
        // setTimeout(() => {
        //     alert("Saved data to the cloud");
        // }, 1000);
        toggleButtonRef.current.click();
        return () => {
            console.log("[Cockpit.js] cleanup work in useEffect 1");
        };
    }, []);

    // cus there are no dependencies array, this will run for every render of the Cockpit. Combines componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log("[Cockpit.js] useEffect 2");
        return () => {
            console.log("[Cockpit.js] cleanup work in useEffect 2");
        };
    });

    let buttonClasses = "";
    if(props.showPersons)
        buttonClasses = classes.Red;

    const assignedClasses = [];
    if(props.personsLength <= 2) {
      assignedClasses.push(classes.red);
    }
    if(props.personsLength <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(" ")}>
                this is rly working
            </p>
            <button 
                className={buttonClasses} 
                onClick={props.clicked}
                ref={toggleButtonRef}
            >
                Toggle Persons
            </button>
            <button onClick={authContext.login}>Login</button>
        </div>
    );
}
 
// uses memoization, memoize = store a snapshot of this component, and only if its input changes react will re-render it. Otherwise, if this input doesnt change and some parent component wants to update the Cockpit then react will give back that stored component
export default React.memo(Cockpit);
