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
        // On mount, set component state to engineer whose id is passed in
        this.findPerson();
    }

    componentDidUpdate(prevProps) {
        // Allows a new id to be entered without refreshing page
        if (prevProps.id !== this.props.id) {
            this.findPerson();
        }
    }

    findPerson() {
        // Set state to candidate or null. Null is important for rendering ids that are not in the csv file
        // Call findCompanies only after candidate is set in state
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

        // Only include companies in state that are similar based on fractal_index
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

        // Only include scores of engineers with same title and at companies included in state
        this.props.people.forEach(person => {
            if (this.state.companies.includes(person.company_id) && person.title === this.state.candidate.title) {
                scores.push(person.coding_score);
            }
        });

        //Sort scores before getting percentile
        scores = scores.sort((a,b) =>  a - b);

        // Find idx of current engineer's score
        const idx = scores.indexOf(this.state.candidate.coding_score);

        // Percentile is number of scores below current user's divided by total number of scores
        const percentile = Math.round((scores.slice(0, idx).length / (scores.length)) * 100);
        return percentile;
    }

    getCommunciation() {
        // Communication score found same way as coding score
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
        // Only render percentile score if user id is in csv file
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
            );
        }
    }
}

export default Percentiles;