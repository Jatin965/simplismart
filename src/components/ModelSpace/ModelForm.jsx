import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ModelForm = ({ inputs, outputs, modelId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [outputData, setOutputData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `https://frontend-assignment-api.misc.simplismart.ai/model-spaces/${modelId}/generate`,
        formData
      );
      setOutputData(response.data.data);
    } catch (err) {
      setError("An error occurred while generating the output.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="model-form-output">
      <div className="model-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((input) => (
            <div key={input.name} className="form-group">
              <label htmlFor={input.name}>{input.name}</label>
              <input
                id={input.name}
                type={input.type === "image" ? "file" : input.type}
                accept={input.type === "image" ? "image/*" : ""}
                defaultValue={input.default || ""}
                {...register(input.name, { required: input.required })}
                className="form-control"
              />
              <p>{input.description}</p>
            </div>
          ))}
          <button type="submit" className="submit-btn">
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>

      <div className="model-output">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {outputData && (
          <div>
            {outputs.map((output) => (
              <div key={output.name} className="output-group">
                <label>{output.name}</label>
                {output.type === "text" ? (
                  <textarea
                    className="output-text"
                    readOnly
                    value={outputData[output.name] || ""}
                  />
                ) : output.type === "image" ? (
                  <img
                    src={outputData[output.name]}
                    alt={output.name}
                    className="output-image"
                  />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelForm;
