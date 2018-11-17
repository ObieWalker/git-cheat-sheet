import React from 'react';
import { Modal } from 'react-bootstrap'

const CheatModal= ({ addCheat, updateDetails, show, onHide, errors, categoryTitle, category }) => {
  return (
    <div>
      <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title"
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Add cheat to "{categoryTitle}"
            </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
            <label htmlFor="name" className="active">
              Cheat Description:
            </label>
            {errors.description && (
              <span className="alert-danger"><br />
                {errors.description}
              </span>
            )}
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              required
              onChange={updateDetails}
            />
            <br />

            <label htmlFor="name" className="active">
              Cheat Command:
            </label>
            {errors.command && (
              <span className="alert-danger"><br />
                {errors.command}
              </span>
            )}
            <input
              type="text"
              className="form-control"
              id="command"
              name="command"
              required
              onChange={updateDetails}
            />
            <br />

            <label htmlFor="name" className="active">
              Keywords(optional):
            </label>
            <input
              type="text"
              className="form-control"
              id="keywords"
              name="keywords"
              defaultValue='git, start, branch'
              onChange={updateDetails}
            />
            <br />
            </Modal.Body>
            <Modal.Footer>
                <button
                  type="submit"
                  id="add-grocery"
                  className="waves-effect waves-dark
                  btn right hoverable dark-green btn btn-primary"
                  onClick={() => addCheat(category.id)}>
                  Add Cheat
                </button>
            
            </Modal.Footer>
          </Modal>
    </div>
  );
}

export default CheatModal;
