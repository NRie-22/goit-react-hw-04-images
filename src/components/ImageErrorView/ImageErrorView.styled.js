import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  margin: 1vh auto;
`;

export const Text = styled.p`
  max-width: 80%;
  color: black;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-size: 22px;
`;

export const Img = styled.img`
  width: 25vw;
  height: auto;
  object-fit: contain;
  object-position: center;
  margin-bottom: 24px;
`;
