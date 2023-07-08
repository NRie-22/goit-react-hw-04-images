import PropTypes from 'prop-types';
import { ImageItem, Img } from './ImageGalleryItem.styled';


const ImageGalleryItem = ({ item, openModal }) => {
  const { largeImageURL, tags, webformatURL } = item;

  const handleClick = e => {
    e.preventDefault();
    openModal(largeImageURL, tags);
  };

  return (
    <ImageItem onClick={handleClick}>
      <Img src={webformatURL} alt={tags} loading="lazy" />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
