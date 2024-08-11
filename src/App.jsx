import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModelSpace from "./pages/ModelSpace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model-space/:modelId" element={<ModelSpace />} />
      </Routes>
    </Router>
  );
}

export default App;
