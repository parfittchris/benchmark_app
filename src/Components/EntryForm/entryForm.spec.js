import React from 'react';
import { shallow } from 'enzyme';
import EntryForm from './entryForm';

describe('EntryForm component', () => {
    const wrapper = shallow(<EntryForm />);

    it('Should render component', () => {
        expect(wrapper.exists()).toBe(true);
    });
    
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
});