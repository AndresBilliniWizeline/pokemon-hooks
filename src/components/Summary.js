import React from "react";

import "./Summary.css";

const Summary = ({ name, image, height, weight, type, movesCount }) => {
  return (
    <div className="summary">
      <h1>{name}</h1>
      <img className="summary-image" alt="pokemon" src={image} />
      <p>
        Height: <span className="summary-info-item">{height}</span>
      </p>
      <p>
        Weight: <span className="summary-info-item">{weight}</span>
      </p>
      <p>
        Type: <span className="summary-info-item">{type}</span>
      </p>
      <p>
        Moves count:{" "}
        <span className="summary-info-item">{movesCount}</span>
      </p>
    </div>
  );
};

export default Summary;
