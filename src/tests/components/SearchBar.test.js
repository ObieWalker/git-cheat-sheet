import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import SearchBar from '../../components/SearchBar';

let mounted;
let props;
let wrapper;
const updateSearch = jest.fn(() => Promise.resolve({}));

const getComponent = () => {
  if (!mounted) {
    props = {
      updateSearch
    };
    mounted = shallow(<SearchBar {...props} />);
  }
  return mounted;
};

describe('cheats Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('should click on delete cheat button', () => {
    wrapper = getComponent();
    wrapper
    .find('.form-control')
    .simulate('change', { target: { name: 'search', value: 'obi' } });
  });
});

