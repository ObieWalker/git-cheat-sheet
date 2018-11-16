import React from 'react';

const Cheats = ({cheats}) => {
  return (
      <div>
        <h5 className="white-text">{cheats.description}</h5>
        <h6 className="white-text">$ {cheats.command}</h6>
        <br />
      </div>
    );
  }

export default Cheats;
