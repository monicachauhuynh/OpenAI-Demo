import React from "react";
import styled from "styled-components";

const StyledLanding = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 6.5rem;
    margin: 2rem !important;
  }
  label {
    font-size: 1rem;
  }
`;

const StyledTryButton = styled.button`
  height: 2.5rem;
  width: 10rem;
  font-family: Manrope;
  text-align: center;
  color: white;
  background: black;
  align-self: center;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  margin: 0.2rem;
  &:hover {
    color: black;
    background: white;
  }
`;

const StyledViewButton = styled.button`
  height: 2.5rem;
  width: 10rem;
  font-family: Manrope;
  text-align: center;
  color: black;
  background: transparent;
  align-self: center;
  border: none;
  margin: 0.2rem;
  &:hover {
    font-weight: bold;
  }
  a {
    text-decoration: none;
  }
`;

const Landing = () => {
  return (
    <StyledLanding>
      <h1>Curie</h1>
      <label>Enter plain text prompts, get AI's responses.</label>
      <label>OpenAI’s API provides access to GPT-3.</label>
      <div style={{ marginTop: "2rem" }}>
        <StyledTryButton>TRY NOW</StyledTryButton>
        <StyledViewButton>
          <a
            href="https://github.com/monicachauhuynh/OpenAI-Demo"
            target="_blank"
            rel="noreferrer"
          >
            VIEW GITHUB
          </a>
        </StyledViewButton>
      </div>
    </StyledLanding>
  );
};

export default Landing;
