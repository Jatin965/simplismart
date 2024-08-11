import React, { useEffect, useState } from "react";
import axios from "axios";
import ModelSpaceGrid from "../components/Home/ModelSpaceGrid";

const Home = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          {loading && <div className="loader home-loader"></div>}

          {!loading && error && <p className="error-message">{error}</p>}

          {!loading && !error && data && (
            <>
              <div className="head">
                <h1>Home</h1>
              </div>
              <ModelSpaceGrid data={data} />{" "}
            </>
          )}
          {!loading && !error && !data && (
            <p className="error-message">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
