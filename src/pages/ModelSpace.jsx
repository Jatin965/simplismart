import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ModelCard from "../components/ModelSpace/ModelCard";
import ModelForm from "../components/ModelSpace/ModelForm";

const ModelSpace = () => {
  const { modelId } = useParams();

  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("modelId", modelId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://frontend-assignment-api.misc.simplismart.ai/model-spaces/${modelId}`
        );
        setData(response.data.data);
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    if (modelId) fetchData();
  }, [modelId]);

  console.log("data", data);
  return (
    <div className="model-space">
      <div className="model-space-container">
        <div className="model-space-content">
          <ModelCard
            name={data?.name}
            description={data?.description}
            avatar={data?.avatar}
          />

          <ModelForm />
        </div>
      </div>
    </div>
  );
};

export default ModelSpace;
