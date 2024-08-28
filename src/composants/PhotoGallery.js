import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  position: relative;
  padding: 20px;
  background: linear-gradient(135deg, #fdfdfd, #2c3e50);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #f1d3cf;
  margin-bottom: 30px;
  font-family: 'Great Vibes', cursive;
  text-shadow: 0px 0px 5px #f1d3cf;

  @media (max-width: 480px) {
    font-size: 2em;
    margin-bottom: 20px;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
`;

const PhotoCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;
const PhotoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;
const FullscreenOverlay = styled.div`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FullscreenPhoto = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #f1d3cf;
  border: none;
  padding: 10px 30px;
  font-size: 1.2em;
  color: #2c3e50;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #e8b5b1;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 1em;
  }
`;

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://backend-photosmariage.onrender.com/files');
        if (response.ok) {
          const data = await response.json();
          setPhotos(data);
        } else {
          setError('Failed to load photos');
        }
      } catch (error) {
        setError('An error occurred while fetching photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const openFullscreen = (photo) => {
    setFullscreenPhoto(photo);
  };

  const closeFullscreen = () => {
    setFullscreenPhoto(null);
  };

  const handleBackClick = () => {
    navigate('/home');
  };

  if (loading) {
    return <p>Loading photos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <GalleryContainer>
    <BackButton onClick={handleBackClick}>Back to Home</BackButton>
      <Title>Photo Gallery</Title>
      <PhotoGrid>
        {photos.map((photo) => (
          <PhotoCard key={photo.key} onClick={() => openFullscreen(photo)}>
            <Photo src={photo.url} alt={photo.key} />
            <PhotoOverlay />
          </PhotoCard>
        ))}
      </PhotoGrid>

      <FullscreenOverlay visible={fullscreenPhoto} onClick={closeFullscreen}>
        {fullscreenPhoto && (
          <FullscreenPhoto src={fullscreenPhoto.url} alt={fullscreenPhoto.key} />
        )}
      </FullscreenOverlay>
    </GalleryContainer>
  );
};

export default PhotoGallery;
