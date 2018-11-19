import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../../components/App'

let mounted;
let props;
let wrapper;

const getComponent = () => {
  if (!mounted) {
    props = {};
    mounted = shallow(<App {...props} />);
  }
  return mounted;
};

describe('App Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });
});
