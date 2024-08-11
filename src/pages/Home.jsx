import React, { useEffect, useState } from "react";
import axios from "axios";
import ModelSpaceGrid from "../components/ModelSpaceGrid";

const Home = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://frontend-assignment-api.misc.simplismart.ai/model-spaces"
        );
        setData(response.data.data);
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("data", data);
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          <div className="head">
            <h1>Home</h1>
          </div>
          <ModelSpaceGrid data={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;
