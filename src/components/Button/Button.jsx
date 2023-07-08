import React from 'react';
import { BtnLoadMore } from './Button.styled';

const Button = ({ onLoadMore }) => {
  const handleClick = () => {
    // Вызов функции-обработчика переданной через пропс onLoadMore
    if (onLoadMore) {
      onLoadMore();
    }
  };

  return <BtnLoadMore onClick={handleClick}>Load more</BtnLoadMore>;
};

export default Button;
