import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ModelForm = ({ inputs, outputs, modelId }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const [outputData, setOutputData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFormData = async (formData) => {
    const processedData = { ...formData };

    // Convert number inputs to numbers
    inputs.forEach((input) => {
      if (input.type === "number") {
        processedData[input.name] = Number(processedData[input.name]);
      }
    });

    // Convert image/audio files to base64
    const fileInputs = inputs.filter(
      (input) => input.type === "image" || input.type === "audio"
    );
    for (const input of fileInputs) {
      const file = getValues(input.name)?.[0];
      if (file) {
        const base64 = await convertToBase64(file);
        processedData[input.name] = base64;
      }
    }

    return processedData;
  };

  const onSubmit = async (formData) => {
    const processedData = await processFormData(formData);
    console.log(processedData);

    setLoading(true);
    setError(null);
    setOutputData(null); // Clear previous output data
    try {
      const response = await axios.post(
        `${BASE_URL}/model-spaces/${modelId}/predict`,
        processedData
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
                type={
                  input.type === "image"
                    ? "file"
                    : input.type === "audio"
                    ? "file"
                    : input.type
                }
                accept={
                  input.type === "image"
                    ? "image/*"
                    : input.type === "audio"
                    ? "audio/*"
                    : ""
                }
                defaultValue={input.default ?? ""}
                {...register(input.name, { required: input.required })}
                className="form-control"
              />
              <p className="input-description">{input.description}</p>
            </div>
          ))}
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>

      <div className="model-output">
        {loading && <div className="loader output-loader"></div>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && outputData && (
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
                ) : output.type === "audio" ? (
                  <audio
                    controls
                    src={outputData[output.name]}
                    className="output-audio"
                  />
                ) : null}
              </div>
            ))}
          </div>
        )}
        {!loading && !error && !outputData && (
          <p className="fallback">
            Your output will be visible here. Please submit the form.
          </p>
        )}
      </div>
    </div>
  );
};

export default ModelForm;
