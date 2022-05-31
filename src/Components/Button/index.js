import styled from "styled-components";

export const StyledButton = styled.button`
height: 2.5rem;
width: 10rem;
font-family: Manrope;
text-align: center;
align-self: center;
border: none;
margin: 0.2rem;
border-radius: 40px;
box-shadow: ${(props) =>
  props.primary ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
color: ${(props) => (props.primary ? "white" : "black")};
background: ${(props) => (props.primary ? "black" : "transparent")};
&:hover {
  color: black;
  background: ${(props) => (props.primary ? "white" : "transparent")};
  font-weight: bold;
}
a {
  text-decoration: none;
}
`;