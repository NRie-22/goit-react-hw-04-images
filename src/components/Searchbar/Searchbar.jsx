import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Form, Button, Input } from './Searchbar.styled';
import {
  notificationMassege,
  notificationOptions,
} from '../Notification/Notification';

const Searchbar = ({ onSubmit }) => {
  const [textQuery, setTextQuery] = useState('');

  const onChangeInput = e => {
    setTextQuery(e.currentTarget.value.trim().toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (textQuery === '') {
      toast.error(notificationMassege, notificationOptions);
      return;
    }

    onSubmit(textQuery);
    setTextQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <HiMagnifyingGlass size="24" />
        </Button>

        <Input
          value={textQuery}
          onChange={onChangeInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
      <ToastContainer />
    </Header>
  );
};

export default Searchbar;
