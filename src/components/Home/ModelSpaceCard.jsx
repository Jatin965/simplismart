import React from "react";
import BlockedImg from "../../assets/ms3.jpg";

const ModelSpaceCard = ({ modelSpace }) => {
  return (
    <div className="model-space-card" data-modelid={modelSpace.id}>
      <div className="model-space-card-container">
        <div className="img-wrapper">
          <img
            src={
              modelSpace.name === "Stable Diffusion XL" // Image url is blocked by container
                ? BlockedImg
                : modelSpace.avatar
            }
            alt={modelSpace.name}
          />
        </div>
        <div className="card-details">
          <h2>{modelSpace.name}</h2>
          <p>{modelSpace.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ModelSpaceCard;
