import React from 'react';
import oops from '../../assets/oops.png';
import { Wraper, Img, Text } from './ImageErrorView.styled';

const ImageErrorView = () => {
  return (
    <Wraper>
      <Img src={oops} alt="oops" width="240" />
      <Text>Oops... There are no images matching your search...</Text>
    </Wraper>
  );
};

export default ImageErrorView;
