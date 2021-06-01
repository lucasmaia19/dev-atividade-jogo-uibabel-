import React, { Component } from 'react';

import axios from 'axios';

export default class ExampleHttpClass extends Component {

    constructor(props) {

        super(props);
        this.state = {
            count: 0, 
            atividades: []
        };
    }

    componentDidMount() {

        axios.get('http://localhost:8001/atividade-caixa')
            .then(response => response.data)
            .then(data => {

                console.log("this.state.atividades", this.state.atividades);
                this.setState({atividades: data});
                console.log("this.state.atividades", this.state.atividades);

                this.setState({count: this.state.count + 1})
                console.log("this.state.count", this.state.count);

                this.setState({count: this.state.count + 1})
                console.log("this.state.count", this.state.count);

                this.setState({count: this.state.count + 1})
                console.log("this.state.count", this.state.count);
            })
    }

    render() {

        return (
            <div>
                <h1>
                    Count: {this.state.count}
                </h1>

                <h2>
                    {this.state.atividades.map(e => <div key={e.id}> {e.perguntaTitulo} </div>)}
                </h2>
            </div>
        );
    }
}
