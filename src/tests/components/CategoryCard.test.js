import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import CategoryCard from '../../components/CategoryCard';

let mounted;
let props;
let wrapper;
const cheats = {
  userId: '1122',
  command : [{description:"to"}, {description:'toto'}]
}
const search = ''
const deleteCategory = jest.fn(() => Promise.resolve({}));
const onShow = jest.fn(() => Promise.resolve({}));
const cheatModalShow = jest.fn(() => Promise.resolve({}));
const onCopy = jest.fn(() => Promise.resolve({}));
const deleteCheat = jest.fn(() => Promise.resolve({}));
const userId = '1234'
const categoryId = '12345'

const getComponent = () => {
  if (!mounted) {
    props = {
      cheats,
      search,
      deleteCategory,
      onShow,
      cheatModalShow,
      onCopy,
      deleteCheat,
      userId,
      categoryId
    };
    mounted = shallow(<CategoryCard {...props} />);
  }
  return mounted;
};

describe('cheats Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });


  it('should click on on show', () => {
    wrapper = getComponent();
    wrapper
    .find('.btn-warning')
    .simulate('click');
  });  
  
  it('should click on delete category', () => {
    wrapper = getComponent();
    wrapper
    .find('.btn-danger')
    .simulate('click');
  });

  it('should click on delete category', () => {
    wrapper = getComponent();
    wrapper
    .find('.btn-primary')
    .simulate('click');
  });

});

