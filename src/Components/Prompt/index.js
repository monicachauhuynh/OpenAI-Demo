import React, { useState } from "react";

const Prompt = () => {
  const [formData, setFormData] = useState({});
  const [responseSuccess, setResponseSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
      },
      body: JSON.stringify(formData),
    };
    fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      requestOptions
    )
      .then((response) => {
        console.log(response);
        response.json();
        if (response.status === 200) {
          setResponseSuccess(true);
        }
      })
      .then((data) => console.log(data));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Fun with AI</h1>
          <label>Enter Prompt</label>
          <div>
            <textarea
              id="prompt"
              name="prompt"
              onChange={handleInputChange}
              value={formData.prompt}
            ></textarea>
          </div>
          <div>
            <button id="submitButton">SUBMIT</button>
          </div>
        </div>
      </form>
      {responseSuccess && (
        <div>
          <h2>Responses</h2>
          <div>
            <p>Prompt: {formData.prompt}</p>
            <p>Response:</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prompt;
