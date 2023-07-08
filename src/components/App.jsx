import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageErrorView } from './ImageErrorView/ImageErrorView';
import { imgApi } from '../service/imgApi';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const App = () => {
  const [textQuery, setTextQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!textQuery || page === 1) return;

      setLoading(true);

      try {
        const response = await imgApi(textQuery, page);
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

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = (imgUrl, tag) => {
    setShowModal(true);
    setImgUrl(imgUrl);
    setTag(tag);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={onOpenModal} />

      {showModal && (
        <Modal onClose={onCloseModal}>
          <img src={imgUrl} alt={tag} />
        </Modal>
      )}

      <Loader isLoading={loading} />

      {totalPage / 12 > page && <Button loadMore={onLoadMore} />}

      {totalPage === 0 && <ImageErrorView />}

      {error && <ImageErrorView>{error}</ImageErrorView>}
    </>
  );
};

export default App;
