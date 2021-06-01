import React, { Component } from 'react';

class ExampleCountClass extends Component {

    constructor(props) {

        super(props);
        this.state = {count: 0};
    }

    componentDidMount() {

        this.setState({count: this.state.count + 1})
        console.log("this.state.count", this.state.count);

        this.setState({count: this.state.count + 1})
        console.log("this.state.count", this.state.count);

        this.setState({count: this.state.count + 1})
        console.log("this.state.count", this.state.count);
    }

    render() {

        return (
            <div>
                <h1>
                    Count: {this.state.count}
                </h1>
            </div>
        );
    }
}

export default ExampleCountClass;