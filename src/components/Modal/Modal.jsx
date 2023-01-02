import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ onImageClick, largeImageURL }) => {
  useEffect(() => {
    const onEscapePress = e => {
      if (e.code === 'Escape') {
        onImageClick('');
      }
    };
    window.addEventListener('keydown', onEscapePress);
    return () => window.removeEventListener('keydown', onEscapePress);
  }, [onImageClick]);

  const backdropClick = e => {
    if (e.target === e.currentTarget) {
      onImageClick('');
    }
  };

  return (
    <div className={css.Overlay} onClick={backdropClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  setLargeImageURL: PropTypes.func,
};
