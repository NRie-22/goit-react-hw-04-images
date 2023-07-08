import { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Form, Button, Input } from './Searchbar.styled';
import {
  notificationMassege,
  notificationOptions,
} from '../Notification/Notification';

export function Searchbar({ onSubmit }) {
  const [textQuery, setTextQuery] = useState('');

  const onChangeInput = e => {
    setTextQuery(e.target.value.trim().toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Проверка на пустой поисковый запрос
    if (textQuery === '') {
      toast.error(notificationMassege, notificationOptions);
    } else {
      onSubmit(textQuery);
      setTextQuery('');
    }
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
}
