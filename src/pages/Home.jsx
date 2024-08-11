import React, { useEffect, useState } from "react";
import axios from "axios";
import ModelSpaceGrid from "../components/Home/ModelSpaceGrid";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/model-spaces`);
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    if (value) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, 300);

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          {loading && <div className="loader home-loader"></div>}

          {!loading && error && <p className="error-message">{error}</p>}

          {!loading && !error && (
            <>
              <div className="header">
                <h1>Simplismart</h1>
                <h2>Your go-to platform for AI models</h2>
                <input
                  type="text"
                  placeholder="Search models..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-bar"
                />
              </div>
              {filteredData.length > 0 ? (
                <ModelSpaceGrid data={filteredData} />
              ) : (
                <p className="error-message">No data available.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
