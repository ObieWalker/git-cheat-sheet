import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import CheatModal from '../../components/CheatModal';

let mounted;
let props;
let wrapper;
const addCheat = jest.fn(() => Promise.resolve({}));
const updateDetails = jest.fn(() => Promise.resolve({}));
const show  = false
const onHide = jest.fn(() => Promise.resolve({}));
const errors = {
  description : "there is error",
  command : 'there is error too'
}
const categoryTitle = ''
const category = {

}

const getComponent = () => {
  if (!mounted) {
    props = {
      addCheat, 
      updateDetails, 
      show, 
      onHide, 
      errors, 
      categoryTitle, 
      category 
    };
    mounted = shallow(<CheatModal {...props} />);
  }
  return mounted;
};

describe('cheats Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('should fill in form', () => {
    wrapper = getComponent();
    wrapper
    .find('.ch-description')
    .simulate('change', { target: { name: 'description', value: 'obi' } });
  });

  it('should click on add cheat', () => {
    wrapper = getComponent();
    wrapper
    .find('.waves-effect')
    .simulate('click');
  });
});

