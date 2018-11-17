import React from 'react';
import '../styles/App.css';

const SearchBar = ({updateSearch}) => {
  return (
    <div className="container">
      <br/>
      <div className="row justify-content-center" style={{ width: '50%', float: 'none', margin: 'auto 33%' }}>
        <div className="col-12 col-md-10 col-lg-8">
            <form className="card card-sm">
                <div className="card-body row no-gutters align-items-center">
                    <div className="col-auto">
                    </div>
                    <div className="col">
                        <input className="form-control form-control-lg form-control-borderless fa"
                        
                        type="search"
                        name='search'
                        onChange={updateSearch.bind(this)}
                        placeholder="&#61442; THE AWESOME GIT CHEAT SHEET"
                        />
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
    );
  }

export default SearchBar;
