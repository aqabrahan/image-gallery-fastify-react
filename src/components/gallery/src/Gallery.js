import 'react-image-gallery/styles/css/image-gallery.css';
import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { LinearProgress } from '@material-ui/core';

const Gallery = props => {
  const { images, loading, error } = props;

  if (error) {
    return <div>ERROR</div>
  }

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <ImageGallery lazyLoad={true} items={images} />
  )
}

Gallery.propTypes = {
  images: PropTypes.any,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

Gallery.defaultProps = {
  error: null,
};

export default Gallery;
