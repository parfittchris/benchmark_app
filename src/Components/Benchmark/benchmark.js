import React, { Component } from 'react';


class Benchmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            communicationPercentile: 0,
            codingPercentile: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault()

        this.setState({
            communicationPercentile: 10,
            codingPercentile: 10
        });
    }
    


    render() {
        return (
            <div>
                <p>Communication: {this.state.communicationPercentile} </p>
                <p>Coding: {this.state.codingPercentile}</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" name="Get Percentile"/>
                </form>
            </div>
        )
    }
}

export default Benchmark