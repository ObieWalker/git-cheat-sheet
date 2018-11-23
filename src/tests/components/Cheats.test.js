import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import Cheats from '../../components/Cheats';

let mounted;
let props;
let wrapper;
let userId = '1234'
const cheat = {
  userId : userId
}
const onCopy = jest.fn(() => Promise.resolve({}));
const deleteCheat = jest.fn(() => Promise.resolve({}));
const categoryId = ''

const getComponent = () => {
  if (!mounted) {
    props = {
      cheat,
      onCopy,
      userId,
      deleteCheat,
      categoryId
    };
    mounted = shallow(<Cheats {...props} />);
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
    .find('.btn-sm')
    .simulate('click');
  });
  it('should click onCopy button', () => {
    wrapper = getComponent();
    wrapper
    .find('.onCopy')
    .simulate('click');
  });

});

