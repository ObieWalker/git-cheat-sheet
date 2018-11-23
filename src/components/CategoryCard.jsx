import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryHeader from './CategoryHeader';
import Cheats from './Cheats';
import '../styles/App.css';

const CategoryCard = ({cheats, search, deleteCategory, onShow, cheatModalShow, onCopy, deleteCheat, userId, categoryId }) => {
  let filteredCommands = cheats.command.filter((command) => {
    return command.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })
  return (
      <div className="card card-cascade narrower bg-dark" style={{ width: '33%', borderRadius: '2%' }}>
        <div className="card-body" style={{ padding: '5%' }}>
          <div>
            {cheats.userId &&
            <div className="pull-right">
              <button 
                onClick={() => onShow(cheats)}
                className="btn btn-sm btn-warning"
                ><i className="far fa-edit"></i>
                </button> 
                &nbsp;
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => deleteCategory(cheats._id)}>
                <i className="far fa-trash-alt"></i></button>
            </div>
            }
          <h5 className="card-title pb-2 pt-1 text-white bg-dark">
            <CategoryHeader 
            categoryTitle={cheats.name}/>

          </h5>
          <hr />
          {
            cheats.command && cheats.command.length > 0 ? (
              
              filteredCommands.map((eachCheat) => (
                <Cheats 
                onCopy={onCopy}
                cheat={eachCheat}
                key={eachCheat._id}
                deleteCheat={deleteCheat}
                userId={userId}
                categoryId={categoryId}
                /> 
              ))
            ) : (
              <h6 className="text-center ">Add to this category.</h6>
            )
          }
          <button 
            className="btn btn-primary center btn-lg"
            onClick={() => cheatModalShow(cheats)}>
            <i className="fas fa-plus-circle"></i></button>
          <br />
          </div>
        </div>
      </div>
    );
  }

export default CategoryCard;
