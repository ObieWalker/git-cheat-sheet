import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import connect, {Categories} from '../../components/Categories';

const mockStore = configureStore();
let mounted;
let props;
let wrapper;
const categories = [
  {name:'sddsf'}, {name: 'sdfdss'}
]
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
      categories,
      search,
      deleteCategory,
      onShow,
      cheatModalShow,
      onCopy,
      deleteCheat,
      userId,
      categoryId
    };
    mounted = shallow(<Categories {...props} />);
  }
  return mounted;
};

describe('cheats Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders component successfully', () => {
    wrapper = getComponent();
    wrapper.setProps({ categories: [] });
  });


});

describe('Connected Component', () => {
  describe('Connected mounted', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        categories
      });
      wrapper = shallow(<connect
        store={store}
        categories={categories}
      />);
      expect(wrapper.length).toBe(1);
    });
  });
});


