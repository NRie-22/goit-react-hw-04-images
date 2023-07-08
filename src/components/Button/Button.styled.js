import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { BtnLoadMore } from './Button.styled';

const Button = ({ loadMore }) => {
  const handleClick = useCallback(() => {
    loadMore();
  }, [loadMore]);

  return <BtnLoadMore onClick={handleClick}>Load more</BtnLoadMore>;
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
