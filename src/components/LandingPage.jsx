import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBar from './SearchBar';
import Categories from './Categories';
import CategoryModal from './CategoryModal';
import CheatModal from './CheatModal';
import validateCategory, {editCategoryValidator, addCheatValidator} from '../helpers/inputValidator';
import { addCategory, deleteCategory, editCategory, addCheat } from '../actions/cheatsAction';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      show: false,
      cheatModalShow: false,
      categoryTitle: '',
      description: '',
      command: '',
      keywords: '',
      category: {},
      errors: {},
      modalLoading: false,
      pageLoading: false,
      cheatLoading: false
    };

    this.handleHide = this.handleHide.bind(this);
    this.updateDetails = this.updateDetails.bind(this)
    this.addCategory = this.addCategory.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.addCategoryformIsValid = this.addCategoryformIsValid.bind(this)
    this.addCheatformIsValid = this.addCheatformIsValid.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.modalShow = this.modalShow.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.editformIsValid = this.editformIsValid.bind(this)
    this.cheatModalShow = this.cheatModalShow.bind(this)
    this.cheatModalOnHide = this.cheatModalOnHide.bind(this)
    this.addCheat = this.addCheat.bind(this)
  }

  addCategory(e) {
    e.preventDefault();
    if (this.addCategoryformIsValid()) {
      this.setState({ errors: {}, modalLoading: true });
      this.props.addCategory(this.state.categoryTitle).then(() => {
        this.setState({
          categoryTitle: '',
          show: false,
          modalLoading: false
        })
      })
    }
  }

  addCheat(id){
    if (this.addCheatformIsValid()) {
      this.setState({ errors: {}, cheatLoading: true });
      const cheatDetails = {
        command: this.state.command,
        description: this.state.description,
        keywords: this.state.keywords
      }
      this.props.addCheat(id, cheatDetails).then(() => {
        this.setState({
          cheatModalShow: false,
          cheatLoading: false,
          description: '',
          command: '',
          keywords: '',
        })
      })
    }
  }

  editCategory(categoryId) {
    if (this.editformIsValid()) {
      this.setState({ errors: {}, modalLoading: true });
      if (this.state.categoryTitle !== ''){
        this.props.editCategory(categoryId, this.state.categoryTitle).then(() => {
          this.setState({
            categoryTitle: '',
            show: false,
            modalLoading: false
          })
        })
      }
    }
  }
  
  deleteCategory(id) {
    this.props.deleteCategory(id)
  }

  handleHide() {
    this.setState({
      categoryTitle: '',
      description: '',
      command: '',
      show: false,
      category: {},
      errors: {}
    });
  }

  cheatModalOnHide() {
    this.setState({
      description: '',
      command: '',
      keywords: '',
      cheatModalShow: false,
      errors: {}
    });
  }

  cheatModalShow(cheats) {
    this.setState({
      cheatModalShow: true,
      categoryTitle: cheats.name,
      category: { id: cheats._id }
    });
  }

  modalShow(category) {
    this.setState({
      category,
      show: true,
    });
  }

  updateDetails(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  updateSearch(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editformIsValid() {
    const { errors, isValid } = editCategoryValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  addCategoryformIsValid() {
    const { errors, isValid } = validateCategory(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  addCheatformIsValid() {
    const { errors, isValid } = addCheatValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }


  render() {
    return (
      <div>
        <SearchBar 
          updateSearch={this.updateSearch}
          />
        <button 
          type="submit"
          id="add-grocery"
          className="waves-effect waves-dark
          pull-right hoverable dark-green btn btn-primary"
          onClick={() => this.setState({ show: true })} >
          Create new Category</button>
        <br />
        <div className="container">
            <Categories 
              search={this.state.search}
              deleteCategory={this.deleteCategory}
              onShow={this.modalShow}
              cheatModalShow={this.cheatModalShow}
            />
        </div>
        <CategoryModal 
          addCategory={this.addCategory}
          editCategory={this.editCategory}
          updateDetails={this.updateDetails}
          show={this.state.show}
          onHide={this.handleHide}
          errors={this.state.errors}
          category={this.state.category}
        />

        <CheatModal
          cheatModalShow={this.state.cheatModalShow}
          show={this.state.cheatModalShow}
          onHide={this.cheatModalOnHide}
          updateDetails={this.updateDetails}
          errors={this.state.errors}
          addCheat={this.addCheat}
          categoryTitle={this.state.categoryTitle}
          category={this.state.category}
         />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addCategory,
      deleteCategory,
      editCategory,
      addCheat
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
