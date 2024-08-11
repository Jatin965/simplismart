import React from "react";
import ModelSpaceCard from "./ModelSpaceCard";
import { useNavigate } from "react-router-dom";

const ModelSpaceGrid = ({ data }) => {
  const navigate = useNavigate();
  const cardClickHandler = (e) => {
    const modelSpaceId = e.target.closest(".model-space-card").dataset.modelid;
    navigate(`/model-space/${modelSpaceId}`);
  };
  return (
    <div className="model-space-grid" onClick={cardClickHandler}>
      {data?.map((modelSpace) => (
        <ModelSpaceCard key={modelSpace.id} modelSpace={modelSpace} />
      ))}
    </div>
  );
};

export default ModelSpaceGrid;
