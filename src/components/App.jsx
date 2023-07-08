import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageErrorView } from './ImageErrorView/ImageErrorView';
import { imgApi } from '../service/imgApi';

import Button from './Button/Button';
import { Loader } from './Loader/Loader.styled';
import Modal from './Modal/Modal';

export default function App() {
  const [textQuery, setTextQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!textQuery) return;
      setLoading(true);
      try {
        const response = await imgApi(textQuery, currentPage);
        const { hits, totalHits } = response.data;
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalPage(totalHits);
      } catch (error) {
        setError('Что-то пошло не так. Пожалуйста, попробуйте снова.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [textQuery, currentPage]);

  const handleSubmit = searchValue => {
    setTextQuery(searchValue);
    setCurrentPage(1);
    setImages([]);
    setLoading(false);
    setShowModal(false);
    setError(null);
    setTotalPage(null);
  };

  const onLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const onOpenModal = (imgUrl, tag) => {
    setImgUrl(imgUrl);
    setTag(tag);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={onOpenModal} />

      {/* Модальное окно */}
      {showModal && (
        <Modal onClose={onCloseModal}>
          <img src={imgUrl} alt={tag} />
        </Modal>
      )}
      {loading && <Loader />}
      {error && <ImageErrorView errorMessage={error} />}
      {totalPage && currentPage < totalPage && (
        <Button onLoadMore={onLoadMore} />
      )}
    </>
  );
}
