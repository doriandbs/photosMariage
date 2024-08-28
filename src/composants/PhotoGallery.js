import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  position: relative;
  padding: 20px;
  background: linear-gradient(135deg, #fdfdfd, #2c3e50);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #f1d3cf;
  margin-bottom: 30px;
  font-family: 'Great Vibes', cursive;
  text-shadow: 0px 0px 5px #f1d3cf;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  width: 100%;
  max-width: 1200px;
`;

const MediaCard = styled.div`
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

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const FullscreenMedia = styled.div`
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
`;

const PhotoGallery = () => {
  const { category } = useParams(); // Get the category from the URL
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreenMedia, setFullscreenMedia] = useState(null); // State for fullscreen media
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`https://backend-photosmariage.onrender.com/files?category=${category}`);
        if (response.ok) {
          const data = await response.json();
          console.log("DATA", data)
          setMedia(data);
        } else {
          setError('Failed to load media');
        }
      } catch (error) {
        setError('An error occurred while fetching media');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [category]);

  const openFullscreen = (media) => {
    setFullscreenMedia(media); // Set the clicked media to fullscreenMedia state
  };

  const closeFullscreen = () => {
    setFullscreenMedia(null); // Clear fullscreenMedia to close fullscreen mode
  };

  const handleBackClick = () => {
    navigate('/categories'); // Back to the category selection
  };

  if (loading) {
    return <p>Loading media...</p>;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <GalleryContainer>
      <BackButton onClick={handleBackClick}>Back to Categories</BackButton>
      <Title>{category} Gallery</Title>
      <MediaGrid>
  {media.map((item) => {
    console.log(item); // Log chaque item ici
    const isImage = item.key.endsWith('.jpg') || item.key.endsWith('.jpeg') || item.key.endsWith('.png') || item.key.endsWith('.gif');
    const isVideo = item.key.endsWith('.mp4') || item.key.endsWith('.mov') || item.key.endsWith('.avi');

    return (
      <MediaCard key={item.key} onClick={() => openFullscreen(item)}>
        {isImage ? (
          <Photo src={item.url} alt={item.key} />
        ) : isVideo ? (
          <Video src={item.url} alt={item.key} controls />
        ) : null}
      </MediaCard>
    );
  })}
</MediaGrid>

      <FullscreenOverlay visible={fullscreenMedia} onClick={closeFullscreen}>
        {fullscreenMedia && (
          <FullscreenMedia>
            {fullscreenMedia.type && fullscreenMedia.type.startsWith('image') ? (
              <Photo src={fullscreenMedia.url} alt={fullscreenMedia.key} />
            ) : fullscreenMedia.type && fullscreenMedia.type.startsWith('video') ? (
              <Video src={fullscreenMedia.url} controls autoPlay />
            ) : null}
          </FullscreenMedia>
        )}
      </FullscreenOverlay>
    </GalleryContainer>
  );
};

const ErrorPage = ({ message }) => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
};

export default PhotoGallery;
