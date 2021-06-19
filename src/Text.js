import styled, { css } from "styled-components";

const Text = styled.div`
  ${({ size, color, weight }) => {
    return css`
      font-size: ${size ? size : 16}px;
      color: ${color ? color : "black"};
      font-weight: ${weight ? weight : 400};
    `;
  }}
`;

export default Text;
