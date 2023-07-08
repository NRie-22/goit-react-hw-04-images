import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageErrorView } from './ImageErrorView/ImageErrorView';
import { imgApi } from '../service/imgApi';
import Button from './Button/Button';
import { Loader } from './Loader/Loader.styled';
import Modal from './Modal/Modal';

const App = () => {
  const [textQuery, setTextQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
        setError('Something went wrong. Please try again.');
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

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = (imageUrl, imageAlt) => {
    setSelectedImage({ url: imageUrl, alt: imageAlt });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={handleOpenModal} />

      {showModal && (
        <Modal onClose={handleCloseModal}>
          {selectedImage && (
            <img src={selectedImage.url} alt={selectedImage.alt} />
          )}
        </Modal>
      )}

      {loading && <Loader />}
      {error && <ImageErrorView errorMessage={error} />}
      {totalPage && currentPage < totalPage && (
        <Button onLoadMore={handleLoadMore} />
      )}
    </>
  );
};

export default App;
