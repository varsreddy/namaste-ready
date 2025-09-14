import React from "react";

class AboutClass extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
            count: 0,
            count2: 0,
        }
    }
    
    render() {
        const {name,location,contact} = this.props;

        return (
            <div className="about-container">
                <h1>About Us</h1>
                <p>This is a sample React application to demonstrate routing and component structure.</p>
                <h3>Name: {name}</h3>
                <h3>Location: {location}</h3>
                <h4>Contact: {contact}</h4><br />
                <h4>Count: {this.state.count}</h4>
                <h4>Count2: {this.state.count2}</h4>
                <button onClick={() => this.setState({ count: this.state.count + 1,count2: this.state.count2 + 1 })}>Increment Count</button>
            </div>
        )
    }
}

export default AboutClass;