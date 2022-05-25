import React, { useState } from "react";
import styled from "styled-components";

const InputPrompt = styled.textarea`
  height: 15vh;
  width: 60vw;
  resize: none;
  font-family: Poppins;
  border: transparent;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:focus {
    outline: gray;
  }
`;
const SubmitButton = styled.button`
  height: 2rem;
  width: 8rem;
  font-family: Poppins;
  text-align: center;
  color: whitesmoke;
  background: #383838;
  align-self: center;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
`;

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
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      echo: true,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
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
      <p>Prompt: {obj.text.split("\n\n")[0]}</p>
      <p>Response: {obj.text.split("\n\n")[1]}</p>
    </li>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Fun with AI</h1>
          <label>Enter Prompt</label>
          <div style={{ marginTop: "1rem" }}>
            <InputPrompt
              id="prompt"
              name="prompt"
              onChange={handleInputChange}
              value={formData.prompt}
            ></InputPrompt>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <SubmitButton id="submitButton">SUBMIT</SubmitButton>
          </div>
        </div>
      </form>
      {responseSuccess && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Responses</h2>
          <ul>{listItems}</ul>
        </div>
      )}
    </div>
  );
};

export default Prompt;
