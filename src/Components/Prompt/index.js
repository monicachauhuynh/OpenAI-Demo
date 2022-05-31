import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { StyledButton } from "../Button";

const StyledInputPrompt = styled.div`
  margin-top: 3rem;
  textarea {
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
  }
`;

const StyledResponseList = styled.div`
  margin-top: 3rem;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0.5rem 4rem 0.5rem 4rem;
    text-align: left;
  }
  li {
    word-wrap: break-word;
    background: white;
    margin: 1rem;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    border-radius: 20px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    color: black;
    &:hover {
      background: whitesmoke;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

const Prompt = ({ scroll }) => {
  const persistResponses = JSON.parse(localStorage.getItem("responses")) || [];
  const [formData, setFormData] = useState({});
  const [responses, setResponses] = useState(persistResponses);
  const promptRef = useRef();

  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responses));
    if (scroll) promptRef.current.scrollIntoView({ behavior: "smooth" });
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
          <li key={idx}>
            <p>
              <b>Prompt:</b> {obj.text.split("\n\n").shift()}
            </p>
            <p>
              <b>Response:</b> {obj.text.split("\n\n").slice(1).join("")}
            </p>
          </li>
        );
      })
    ) : (
      <span>Awaiting Responses</span>
    );

  return (
    <div ref={promptRef}>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledInputPrompt>
            <h1>Send Curie a Prompt!</h1>
            <textarea
              id="prompt"
              name="prompt"
              onChange={handleInputChange}
              value={formData.prompt}
            ></textarea>
          </StyledInputPrompt>
          <StyledButton primary>SEND</StyledButton>
        </div>
      </form>
      {!!responses && responses.length > 0 && (
        <StyledResponseList>
          <h2>Responses</h2>
          <ul>{listItems}</ul>
        </StyledResponseList>
      )}
    </div>
  );
};

export default Prompt;
