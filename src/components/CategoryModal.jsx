import React from 'react';
import { Modal } from 'react-bootstrap'

const CategoryModal= ({category, addCategory, editCategory, updateDetails, show, onHide, errors}) => {
  return (
    <div>
      <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title"
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Category details
            </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
            <label htmlFor="name" className="active">
              Category Title:
            </label>
            {errors.categoryTitle && (
              <span className="alert-danger"><br />
                {errors.categoryTitle}
              </span>
            )}
            <input
              type="text"
              className="form-control"
              id="categoryTitle"
              name="categoryTitle"
              defaultValue={category.name || ''}
              required
              onChange={updateDetails}
            />
            <br />
            </Modal.Body>
            <Modal.Footer>
              {
                category._id ? 
                <button
                  type="submit"
                  id="add-grocery"
                  className="waves-effect waves-dark
                  btn right hoverable dark-green btn btn-primary"
                  onClick={() => editCategory(category._id)}
                  >Edit Category
                </button>
              :
                <button
                  type="submit"
                  id="add-grocery"
                  className="waves-effect waves-dark
                  btn right hoverable dark-green btn btn-primary"
                  onClick={addCategory}
                  >Add Category
                </button>
            }

            
            </Modal.Footer>
          </Modal>
    </div>
  );
}

export default CategoryModal;
