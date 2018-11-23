import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from 'react-loading-animation';
import toastr from 'toastr';
import swal from 'sweetalert'
import SearchBar from './SearchBar';
import Categories from './Categories';
import CategoryModal from './CategoryModal';
import CheatModal from './CheatModal';
import validateCategory, {editCategoryValidator, addCheatValidator} from '../helpers/inputValidator';
import { getAllCheats, addCategory, deleteCategory, deleteCheat, editCategory, addCheat } from '../actions/cheatsAction';
import { logOut }  from '../actions/userAction'

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
      cheatLoading: false,
      copied: false
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
    this.handleLogOut = this.handleLogOut.bind(this)
    this.onCopy = this.onCopy.bind(this)
    this.deleteCheat = this.deleteCheat.bind(this)
    
  }


  componentWillMount() {
    this.setState({
      pageLoading: true
    })
    this.props.getAllCheats().then(() => {
      this.setState({ 
        pageLoading: false
       })
    })
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logOut();
    this.props.history.push('/');
    window.location.reload();
  }
 
  addCategory(e) {
    e.preventDefault();
    if (this.addCategoryformIsValid()) {
      this.setState({ errors: {}, modalLoading: true });
      const categoryDetails = {
        category: this.state.categoryTitle,
        userId: this.props.userData.user.id
      }
      this.props.addCategory(categoryDetails).then(() => {
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
        keywords: this.state.keywords,
        userId: this.props.userData.user.id
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
    swal({
      title: 'Delete Category',
      text: 'Are you sure you want to delete this category',
      icon: 'info',
      showCancelButton: true,
      buttons: true,
      dangerMode: true,
      closeOnConfirm: false,
      closeOnCancel: true,
      closeOnClickOutside: true
    })
    .then((result) => {
      if(result) {
        this.props.deleteCategory(id)
      } else {
        swal("Category not deleted.", {
          buttons: false,
          timer: 1000,
        });
      }
    })
  }

  deleteCheat(cheatId, categoryId){
    swal({
      title: 'Delete Cheat',
      text: 'Are you sure you want to delete this cheat',
      icon: 'info',
      showCancelButton: true,
      buttons: true,
      dangerMode: true,
      closeOnConfirm: false,
      closeOnCancel: true,
      closeOnClickOutside: true
    })
    .then((result) => {
      if(result) {
        this.props.deleteCheat(cheatId, categoryId)
      } else {
        swal("Cheat not deleted.", {
          buttons: false,
          timer: 1000,
        });
      }
    })
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

  onCopy(command) {
    toastr.clear()
    navigator.clipboard.writeText(`$ ${command}`)
    this.setState({copied: true})
    toastr.success(`'$ ${command}' command successfully copied.`)
    this.setState({copied: false})
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
        <button 
        type="submit"
        id="add-grocery"
        className="waves-effect waves-dark pull-right
        hoverable dark-green btn btn-danger"
        onClick={this.handleLogOut}
        > Logout</button>
        <div>
          <SearchBar 
            updateSearch={this.updateSearch}
            />
          <button 
            type="submit"
            id="add-grocery"
            className="waves-effect waves-dark
            hoverable dark-green btn btn-primary"
            onClick={() => this.setState({ show: true })} >
            Create new Category</button>
        </div>

        <br />
        { this.state.pageLoading ? 
          <Loading /> : 
          <div className="container">
              <Categories 
                onCopy={this.onCopy}
                search={this.state.search}
                deleteCategory={this.deleteCategory}
                onShow={this.modalShow}
                cheatModalShow={this.cheatModalShow}
                deleteCheat={this.deleteCheat}
                userId={this.props.userData.user.id}
              />
          </div>
        }
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
  userData: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllCheats,
      addCategory,
      deleteCategory,
      deleteCheat,
      editCategory,
      addCheat, 
      logOut
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
