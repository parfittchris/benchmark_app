import React from 'react';
import { shallow } from 'enzyme';
import EntryForm from './entryForm';

describe('EntryForm component', () => {
    const wrapper = shallow(<EntryForm />);

    it('Should render component', () => {
        expect(wrapper.exists()).toBe(true);
    });
    
    it('Should not render percentile component when no id is entered', () => {
        const text = wrapper.find('.percentileApp').text();
        expect(text).toEqual('Enter user ID');
        expect(wrapper.find('Percentiles').length).toEqual(0);
    });

    it('Should render percentile component when id is entered', () => {
        let text = wrapper.find('.percentileApp').text();
        expect(text).toEqual('Enter user ID');
        expect(wrapper.find('Percentiles').length).toEqual(0);

        wrapper.setState({ id:897 });

        text = wrapper.find('.percentileApp').text();
        expect(text).not.toEqual('Enter user ID');
        expect(wrapper.find('Percentiles').length).toEqual(1);
    });
});