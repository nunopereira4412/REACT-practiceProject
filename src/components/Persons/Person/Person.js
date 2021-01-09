import React, {Component} from 'react';
import classes from './person.module.css';
import Aux from '../../../hoc/Aux.js';
import withClass from '../../../hoc/withClass';

import AuthContext from '../../../context/authContext';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        console.log("[Person.js] componentDidMount...");
        // this.inputElement.focus();
        // document.querySelector('input').focus();
        this.inputElementRef.current.focus();

        console.log(this.context.authenticated);
    }
    
    render() {
        console.log("[Person.js] rendering...");
        return (
            // style vai dar override as css rules que tenho definidas para Person. O css faz isso e nao o radium
            
            // <div className={classes.Person}>
            
            // or use React.Fragment after importing Fragment from react. Its the same. Aux.js is how Fragment works under the hood
            <Aux>
                <p>{this.context.authenticated ? "Authenticated!" : "Please Login"}</p>
                <p onClick={this.props.clicked}>
                    Im a person with name: {this.props.name} and age: {this.props.age}
                </p>
                <p>{this.props.children}</p>
                <input 
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}
                    // ref={(inputEl) => {this.inputElement = inputEl}}/>
                    ref={this.inputElementRef}/>
            </Aux>
            /* </div> */
        )
    }
}

export default withClass(Person, classes.Person);  