import React from 'react';
import oops from '../../assets/oops.png';
import { Wrapper, Img, Text } from './ImageErrorView.styled';

export const ImageErrorView = () => {
  return (
    <Wrapper>
      <Img src={oops} alt="oops" width="240" />
      <Text>Oops... There are no images matching your search...</Text>
    </Wrapper>
  );
};

export default ImageErrorView;
