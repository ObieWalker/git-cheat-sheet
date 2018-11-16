import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
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
    const { cheats, search } = this.props
    let filteredCategories = cheats.filter((cheat) => {
      return cheat.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })

  return (
      <div className="cards-container">
        {
          cheats && cheats.length > 0 ? (
            filteredCategories.map((eachCategory) => (
              <CategoryCard 
              search={search}
              cheats={eachCategory}
              key={eachCategory._id}
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
  cheats: state.cheats
});


export default connect(mapStateToProps, null)(Categories);
