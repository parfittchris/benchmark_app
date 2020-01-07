# Benchmark App - See how you stack up against similar engineers at yours and other companies!


## Background and Overview

This app allows a user to input the id of any candidate and immediately see that candidate's job title, coding, and communicative scores, as well as where their scores fall in the percentile rank when compared with other engineers at the same level at similar companies to theirs. The data is stored in csv files located internally in an assets folder. The app was built using the Create-React-App and also comes with automated testing specs using jest and enzyme.

## Functionality

In the Benchmark App, users will be able to:
  * Input any user id that is contained in the csv file of all engineers
  * See the inputed engineer's scores and job title as well as his or her percentile rank among engineers of the same title at similar companies
  * Use automated test specifications to ensure the app is performing as intended

## Features

### User ID Input
 ![wire frame](https://github.com/parfittchris/benchmark_app/tree/master/App%20Assets/screenshot.png)
 
 Users input an engineer's id to get access to their scores, title, and percentile rank. The following is the function to  determine the percentile of an engineer's coding score.
 
 ```
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
 ```
 
 ### Automated Tests
 
 The app includes automated testing specs using Jest and Enzyme to ensure the components are behaving and are rendered properly. The following is a test to ensure that the component displaying an engineer's scores and ranking is only rendered when an id is inputed.
 
 ```
 it('Should not render percentile component when no id is entered', () => {
        
        // Confirm default text is rendered and percentile component is not
        const defaultText = wrapper.find('.percentileApp').text();
        expect(defaultText).toEqual('Enter user ID');
        expect(wrapper.find('Percentiles').length).toEqual(0);
    });
    
 it('Should render percentile component when id is entered', () => {
        // Check if percentile component is rendered
        let defaultText = wrapper.find('.percentileApp').text();
        expect(defaultText).toEqual('Enter user ID');
        expect(wrapper.find('Percentiles').length).toEqual(0);

        // Setting id in state auto loads percentile component
        wrapper.setState({ id:897 });

        // Confirm percentile component is loaded and default text is no longer present
        defaultText = wrapper.find('.percentileApp').text();
        expect(defaultText).not.toEqual('Enter user ID');
        expect(wrapper.find('Percentiles').length).toEqual(1);
    });
 ```

## Future Updates
* Replace CSV file reading functionality with backend database that will serve up data via GET Requests
* Add an 'Add User' form to store new users into database and continually update percentile rankings
* Add graphic to visually see percentile rankings
