import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryCard from './CategoryCard'
import '../styles/App.css';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search: ''
    };

  }

  render() {
    const { categories, search, deleteCategory, onShow, cheatModalShow, onCopy, deleteCheat, userId } = this.props
    let filteredCategories = categories.filter((category) => {
      return category.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
  return (
      <div className="cards-container">
        {
          (categories && categories.length > 0 && (categories.userId === null || userId)) ? (
            filteredCategories.map((eachCategory) => (
              <CategoryCard 
                onCopy={onCopy}
                onShow={onShow}
                deleteCategory={deleteCategory}
                search={search}
                cheats={eachCategory}
                key={eachCategory._id}
                cheatModalShow={cheatModalShow}
                deleteCheat={deleteCheat}
                userId={userId}
                categoryId={eachCategory._id}
              /> 
            ))
          )
          : (
            <h3 className="text-center ">No cheats available at this time. Try reloading or add some.</h3>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.cheats
});


export default connect(mapStateToProps, null)(Categories);
