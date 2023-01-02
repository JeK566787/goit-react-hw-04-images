import css from './App.module.css';
import { fetchImages } from 'services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImgUrl, setLargeImagesUrl] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(prevState => [...prevState, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 15));
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const onFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const onImageClick = largeImageURL => {
    setLargeImagesUrl(largeImageURL);
  };
  const onBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onFormSubmit={onFormSubmit} />
      {isEmpty && <p>Nothing is found for this {query}</p>}
      {error && <p>something wrong {error}</p>}

      <ImageGallery images={images} onImageClick={onImageClick} />
      {isLoading && <Loader />}
      {showBtn && <Button onBtnClick={onBtnClick} />}
      {largeImgUrl && (
        <Modal onImageClick={onImageClick} largeImageURL={largeImgUrl} />
      )}
    </div>
  );
};
