import React from "react";
import styled from "styled-components";
import { StyledButton } from "../Button";

const StyledLanding = styled.div`
  h1 {
    font-size: 6.5rem;
    margin: 2rem !important;
  }
  p {
    font-size: 1rem;
    margin: 0.2rem;
  }
`;

const Landing = ({ handleScroll }) => {
  return (
    <StyledLanding>
      <h1>Curie</h1>
      <p>Enter plain text prompts, get AI's responses.</p>
      <p>OpenAI’s API provides access to GPT-3.</p>
      <div style={{ marginTop: "2rem" }}>
        <StyledButton onClick={() => handleScroll(true)} primary>
          TRY NOW
        </StyledButton>
        <StyledButton>
          <a
            href="https://github.com/monicachauhuynh/OpenAI-Demo"
            target="_blank"
            rel="noreferrer"
          >
            VIEW GITHUB
          </a>
        </StyledButton>
      </div>
    </StyledLanding>
  );
};

export default Landing;
