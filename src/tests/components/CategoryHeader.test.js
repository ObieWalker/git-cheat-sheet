import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import CategoryHeader from '../../components/CategoryHeader';

let mounted;
let props;
let wrapper;
const categoryTitle = "Title";
const category = {

}

const getComponent = () => {
  if (!mounted) {
    props = {
      categoryTitle
    };
    mounted = shallow(<CategoryHeader {...props} />);
  }
  return mounted;
};

describe('categoryHeader Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

});

