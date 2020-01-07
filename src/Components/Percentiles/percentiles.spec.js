import React from 'react';
import { mount } from 'enzyme';
import Percentiles from './percentiles';

describe('Percentile component', () => {
    const person = {
        candidate_id: 897,
        coding_score: 196348,
        communication_score: 221857,
        title: "Senior Engineer",
        company_id: 2
    }

    const companies = [
        {
            company_id: 1, 
            fractal_index: 0.678
        },
        {
            company_id: 2,
            fractal_index: 0.792
        }
    ]

    const wrapper = mount(<Percentiles id={897} people={[person]} companies={companies}/>);

    it('Should render component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Should set state of component to the props passed in', () => {
        expect(wrapper.state().candidate).toEqual(person);
        expect(wrapper.state().companies).toEqual([1,2]);
    });

    it('Should render user info', () => {
        const title = wrapper.find('#userTitle').text();
        expect(title).toEqual(person.title);

        const coding = wrapper.find('#userCoding').text();
        expect(coding).toEqual(person.coding_score.toString());

        const comm = wrapper.find('#userComm').text();
        expect(comm).toEqual(person.communication_score.toString());
    });

    it('Should render percentile values', () => {
        const codingScore = wrapper.find('#results-1-score').length;
        expect(codingScore).toBeGreaterThan(0);

        const commScore = wrapper.find('#results-2-score').length;
        expect(commScore).toBeGreaterThan(0);
    });
});