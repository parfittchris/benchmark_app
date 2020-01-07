import React, { Component } from 'react';
import './percentiles.css';

class Percentiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            candidate: null,
            companies: [],
        }

        this.findCompanies = this.findCompanies.bind(this);
        this.findPerson = this.findPerson.bind(this);
        this.getCoding = this.getCoding.bind(this);
        this.getCommunication = this.getCommunciation.bind(this);
    }


    componentDidMount() {
        this.findPerson();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.findPerson();
        }
    }

    findPerson() {
        const candidate = this.props.people.filter(person => person.candidate_id === this.props.id)[0];
        if (candidate !== undefined) {
            this.setState({
                candidate
            }, this.findCompanies);
        } else {
            this.setState({
                candidate: null
            });
        }
    }

    findCompanies() {
        const currentCompany = this.props.companies.filter(company => company.company_id === this.state.candidate.company_id)[0];
        const companies = this.props.companies.filter(company => {
            return this.getSimilarCompanies(currentCompany, company) === true;
        }).map(company => {return company = company.company_id});
        this.setState({
            companies
        });
    }
   
    getSimilarCompanies(company1, company2) {
        return Math.abs(company1['fractal_index'] - company2['fractal_index']) < 0.15;
    }

    getCoding() {
        let scores = [];

        this.props.people.forEach(person => {
            if (this.state.companies.includes(person.company_id) && person.title === this.state.candidate.title) {
                scores.push(person.coding_score);
            }
        });

        scores = scores.sort((a,b) =>  a - b);
        const idx = scores.indexOf(this.state.candidate.coding_score);
        const percentile = Math.round((scores.slice(0, idx).length / (scores.length)) * 100);
        return percentile;
    }

    getCommunciation() {
        let scores = []

        this.props.people.forEach(person => {
            if (this.state.companies.includes(person.company_id) && person.title === this.state.candidate.title) {
                scores.push(person.communication_score);
            }
        });

        scores = scores.sort((a, b) => a - b);
        const idx = scores.indexOf(this.state.candidate.communication_score);
        const percentile = Math.round((scores.slice(0, idx).length / scores.length) * 100);
        return percentile;
    }
    
    render() {
        if (!this.state.candidate || this.state.candidate === undefined) {
            return (
                <div className="results">
                    <h1 className="noResultsTitle">This id is not valid</h1>
                </div>
            )
        } else {
            return (
                <div className="results">
                    <h2>Engineer Info</h2>
                    <div className="userInfo">
                        <div className="userResult">
                            <p>User Title:</p>
                            <p id="userTitle">{this.state.candidate.title}</p>
                        </div>
                        <div className="userResult">
                            <p>User Coding Score:</p>
                            <p id="userCoding">{this.state.candidate.coding_score}</p>
                        </div>
                        <div className="userResult">
                            <p>User Comm. Score:</p>
                            <p id="userComm">{this.state.candidate.communication_score}</p>
                        </div>
                    </div>
                    <h2>Results</h2>
                    <div className="percentileInfo">
                        <div className="results-1">
                            <p>Coding:</p>
                            <p id="results-1-score">{this.getCoding()} Percentile</p>
                        </div>
                        <div className="results-2">
                            <p>Communication:</p>
                            <p id="results-2-score">{this.getCommunication()} Percentile</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Percentiles;