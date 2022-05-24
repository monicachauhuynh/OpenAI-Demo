import React, { useState } from "react";

const Prompt = () => {
  const [formData, setFormData] = useState({});
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [responses, setResponses] = useState([]);
  let choices = [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

    const fetchChoices = fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          setResponseSuccess(true);
        }
        return response.json();
      })
      .then((data) => {
        return data.choices;
      });

    const getChoices = async () => {
      choices = await fetchChoices;
      setResponses(choices);
      console.log(choices);
    };

    getChoices();
  };

  const listItems = responses.map((obj) => (
    <li key={obj.index}>
      <p>Prompt: {formData.prompt}</p>
      <p>Response: {obj.text}</p>
    </li>
  ));

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
          <ul>{listItems}</ul>
        </div>
      )}
    </div>
  );
};

export default Prompt;
