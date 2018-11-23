import React from 'react';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap'

const Cheats = ({cheat, onCopy, deleteCheat, userId, categoryId }) => {
  const tooltip = (
    <Tooltip id="tooltip">
      <strong>Click to Copy</strong>.
    </Tooltip>
  );
  return (
      <div>
        {(cheat.userId === null || cheat.userId === userId) &&
        <div>
          <h5 className="white-text">{cheat.description}
          {cheat.userId &&
          <button 
            className="btn-sm btn-danger pull-right"
            onClick={() => deleteCheat(cheat._id, categoryId)} >X
            </button>}
          </h5>
          <OverlayTrigger placement="bottom" overlay={tooltip}>
            <h6
              bsStyle="default"
              className="white-text onCopy"          
              onClick={() => onCopy(cheat.command)}
            >$ {cheat.command}</h6>
          </OverlayTrigger>
          <br />
        </div>
        }
      </div>
    );
  }

export default Cheats;
