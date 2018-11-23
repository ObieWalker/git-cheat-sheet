import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import CategoryModal from '../../components/CategoryModal';

let mounted;
let props;
let wrapper;
const addCategory = jest.fn(() => Promise.resolve({}));
const editCategory = jest.fn(() => Promise.resolve({}));
const updateDetails = jest.fn(() => Promise.resolve({}));
const show  = false
const onHide = jest.fn(() => Promise.resolve({}));
const errors = {
  categoryTitle : "there is error"
}
const categoryTitle = ''
const category = {

}

const getComponent = () => {
  if (!mounted) {
    props = {
      addCategory, 
      editCategory,
      updateDetails, 
      show, 
      onHide, 
      errors, 
      categoryTitle, 
      category 
    };
    mounted = shallow(<CategoryModal {...props} />);
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
    .find('.ca-title')
    .simulate('change', { target: { name: 'categoryTitle', value: 'obi' } });
  });

  it('should click on add category', () => {
    wrapper = getComponent();
    wrapper
    .find('.waves-effect')
    .simulate('click');
  });

  it('should click on add category', () => {
    wrapper = getComponent();
    wrapper.setProps({ category : {
      _id: '1212121'
    }})
    .find('.waves-effect')
    .simulate('click');
  });
});

