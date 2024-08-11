import React from "react";
import ModelSpaceCard from "./ModelSpaceCard";

const ModelSpaceGrid = ({ data }) => {
  return (
    <div className="model-space-grid">
      {data?.map((modelSpace) => (
        <ModelSpaceCard key={modelSpace.id} modelSpace={modelSpace} />
      ))}
    </div>
  );
};

export default ModelSpaceGrid;
