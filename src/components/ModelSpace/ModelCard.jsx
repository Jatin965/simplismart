import React from "react";
import BlockedImg from "../../assets/ms3.jpg";

const ModelCard = ({ name, description, avatar }) => {
  return (
    <div className="model-card">
      <div className="model-card-container">
        <div className="img-wrapper">
          <img
            src={
              name === "Stable Diffusion XL" // Image url is blocked by container
                ? BlockedImg
                : avatar
            }
            alt={name}
          />
        </div>
        <div className="model-details">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
