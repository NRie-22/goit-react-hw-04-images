import React, { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ImageErrorView } from '../ImageErrorView/ImageErrorView';
import imgApi from './img/apinp';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from '../Modal/Modal';

const App = () => {
  const [textQuery, setTextQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [tag, setTag] = useState('');
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (textQuery !== '') {
        setLoading(true);

        try {
          const response = await imgApi(textQuery, page);
          const { hits, totalHits } = response.data;
          setImages(prevImages => [...prevImages, ...hits]);
          setTotalPage(totalHits);
        } catch (error) {
          setError('Something went wrong. Please try again.');
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [textQuery, page]);

  const handleSubmit = searchValue => {
    setTextQuery(searchValue);
    setPage(1);
    setImages([]);
    setLoading(false);
    setShowModal(false);
    setError(null);
    setTotalPage(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = (imageUrl, imageTag) => {
    setImgUrl(imageUrl);
    setTag(imageTag);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <div>
        {images.length > 0 && (
          <ImageGallery images={images} openModal={handleOpenModal} />
        )}
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <img src={imgUrl} alt={tag} />
        </Modal>
      )}

      {loading && <Loader />}
      {error && <ImageErrorView errorMessage={error} />}
      {totalPage && page < totalPage && <Button onLoadMore={handleLoadMore} />}
    </div>
  );
};

export default App;
