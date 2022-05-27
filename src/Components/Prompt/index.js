import React, { useState, useEffect } from "react";
import styled from "styled-components";

const InputPrompt = styled.textarea`
  height: 8vh;
  width: 40vw;
  resize: none;
  font-family: Manrope;
  border: transparent;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:focus {
    outline: none;
  }
`;
const SubmitButton = styled.button`
  height: 2rem;
  width: 8rem;
  font-family: Manrope;
  text-align: center;
  color: white;
  background: #383838;
  align-self: center;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  &:hover {
    color: #383838;
    background: lightgreen;
  }
`;

const ResponseList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ResponseListItem = styled.li`
  background: white;
  margin: 1rem;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  color: #383838;
  &:hover {
    background: whitesmoke;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Prompt = () => {
  const persistResponses = JSON.parse(localStorage.getItem("responses")) || [];
  const [formData, setFormData] = useState({});
  const [responses, setResponses] = useState(persistResponses);

  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responses));
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      max_tokens: 64,
      temperature: 1,
      top_p: 1.0,
      echo: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        return response.json();
      })
      .then((data) => {
        return data.choices;
      });

    const getChoices = async () => {
      let choices = await fetchChoices;
      setResponses([choices[0], ...responses]);
    };

    getChoices();
  };

  const listItems =
    responses.length > 0 ? (
      responses.map((obj, idx) => {
        return (
          <ResponseListItem key={idx}>
            <p>
              <b>Prompt:</b> {obj.text.split("\n\n").shift()}
            </p>
            <p>
              <b>Response:</b> {obj.text.split("\n\n").slice(1).join("")}
            </p>
          </ResponseListItem>
        );
      })
    ) : (
      <span>Awaiting responses</span>
    );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Fun with OpenAI</h1>
          <label>Send the AI a prompt!</label>
          <div style={{ marginTop: "1rem" }}>
            <InputPrompt
              id="prompt"
              name="prompt"
              onChange={handleInputChange}
              value={formData.prompt}
            ></InputPrompt>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <SubmitButton id="submitButton">SEND</SubmitButton>
          </div>
        </div>
      </form>
      {!!responses && responses.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Responses</h2>
          <ResponseList>{listItems}</ResponseList>
        </div>
      )}
    </div>
  );
};

export default Prompt;
