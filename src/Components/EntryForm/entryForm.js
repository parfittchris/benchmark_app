import React, { Component } from 'react';
import './entryForm.css';
import Percentiles from '../Percentiles/percentiles.js';
import Papa from 'papaparse';


class EntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            companies: [],
            people: []
        };

        this.getPeople = this.getPeople.bind(this);
        this.getCompanies = this.getCompanies.bind(this);
    }
    
    componentDidMount() {
        const scorePath = require("../../assets/score-records.csv");
        const companiesPath = require("../../assets/companies.csv");

        Papa.parse(scorePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.getPeople
        });

        Papa.parse(companiesPath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.getCompanies
        });
    }
    
    getPeople(results) {
        this.setState({
            people: results.data
        });
    }

    getCompanies(results) {
        this.setState({
            companies: results.data
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        const inputId = document.getElementById("inputId").value;
        this.setState({
            id: inputId,
        });
    }
    
    render() {
        let percentile = <h2 className="noIdText">Enter user ID</h2>;
        if (this.state.id !== null) {
          percentile = <Percentiles id={this.state.id} companies={this.state.companies} people={this.state.people}/>
        }

        return (
            <div className="page">
                    <h1 className="appTitle">Candidate Percentile Finder</h1>
                    <form onSubmit={this.handleSubmit.bind(this)} className="pageForm">
                        <p>Enter user id: </p>
                        <input type="number" id="inputId"></input>
                        <button type="submit" id="inputId">Get Percentile</button>
                    </form>
                <div className="percentileApp">
                    {percentile}
                </div>
            </div>
        )
    }
}

export default EntryForm;