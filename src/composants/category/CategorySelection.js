import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #fdfdfd, #2c3e50);
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #f1d3cf;
  margin-bottom: 30px;
  font-family: 'Great Vibes', cursive;
  text-shadow: 0px 0px 5px #f1d3cf;
`;

const CategoryButton = styled.button`
  background-color: #f1d3cf;
  border: none;
  padding: 15px 30px;
  margin: 10px;
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
const CategorySelection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/gallery/${category}`);
  };
  const handleBackClick = () => {
    navigate('/home'); 
  };

  return (
    <CategoryContainer>
      <BackButton onClick={handleBackClick}>Back to home</BackButton>
      <Title>Select a Category</Title>
      <CategoryButton onClick={() => handleCategoryClick("Vin d'honneur")}>Vin d'honneur</CategoryButton>
      <CategoryButton onClick={() => handleCategoryClick("Repas")}>Repas</CategoryButton>
      <CategoryButton onClick={() => handleCategoryClick("Danse")}>Danse</CategoryButton>
      <CategoryButton onClick={() => handleCategoryClick("Préparatifs")}>Préparatifs</CategoryButton>
      <CategoryButton onClick={() => handleCategoryClick("Cérémonie")}>Cérémonie</CategoryButton>
    </CategoryContainer>
  );
};

export default CategorySelection;
