import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ setLargeImageURL, largeImageURL }) => {
  useEffect(() => {
    const onEscapePress = e => {
      if (e.code === 'Escape') {
        setLargeImageURL('');
      }
    };

    document.addEventListener('keydown', onEscapePress);
    return document.removeEventListener('keydown', onEscapePress);
  }, [setLargeImageURL]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      setLargeImageURL('');
    }
  };

  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  setLargeImageURL: PropTypes.func,
};
