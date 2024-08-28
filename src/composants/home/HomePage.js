import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const neonGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #ffacd4, 0 0 20px #ffacd4, 0 0 30px #ffacd4, 0 0 40px #ffacd4, 0 0 50px #ffacd4, 0 0 60px #ffacd4, 0 0 70px #ffacd4;
  }
  50% {
    text-shadow: 0 0 20px #ff69b4, 0 0 30px #ff69b4, 0 0 40px #ff69b4, 0 0 50px #ff69b4, 0 0 60px #ff69b4, 0 0 70px #ff69b4, 0 0 80px #ff69b4;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #c7c8c3, #a0a09f);
  font-family: 'Great Vibes', cursive;
  color: #333;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 4em;
  color: #f1d3cf;
  animation: ${neonGlow} 2s infinite alternate;
  margin-bottom: 50px;
  text-shadow: 0px 0px 5px #f1d3cf;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 2.5em;
    margin-bottom: 30px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid #f1d3cf;
  padding: 15px 40px;
  margin: 15px;
  font-size: 1.5em;
  color: #f1d3cf;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-family: 'Orbitron', sans-serif;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 300%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 105, 180, 0.3), transparent);
    transition: all 0.3s ease;
    transform: skewX(-45deg);
    z-index: -1;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    color: #2c3e50;
    background-color: #ff69b4;
    border: 2px solid transparent;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 1.2em;
    margin: 10px;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  const goToUpload = () => {
    navigate('/upload');
  };

  const goToGallery = () => {
    navigate('/gallery');
  };

  return (
    <Container>
      <Title>Wedding Memories</Title>
      <Button onClick={goToUpload}>Upload Your Photos</Button>
      <Button onClick={goToGallery}>View the Gallery</Button>
    </Container>
  );
};

export default HomePage;
