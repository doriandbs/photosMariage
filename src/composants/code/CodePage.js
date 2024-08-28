import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #fdfdfd, #2c3e50);
  font-family: 'Great Vibes', cursive;
  color: #333;
  padding: 20px;
`;

const AccessForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 3em;
  color: #f1d3cf;
  margin-bottom: 20px;
  text-shadow: 0px 0px 5px #f1d3cf;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 2em;
  }
`;

const Input = styled.input`
  padding: 10px 20px;
  font-size: 1.2em;
  margin-bottom: 20px;
  border: 2px solid #f1d3cf;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s ease;
  width: 100%;

  &:focus {
    border-color: #2c3e50;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 1em;
  }
`;

const Button = styled.button`
  background-color: #f1d3cf;
  border: none;
  padding: 10px 30px;
  font-size: 1.5em;
  color: #2c3e50;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #e8b5b1;
  }

  @media (max-width: 480px) {
    font-size: 1.2em;
    padding: 8px 20px;
  }
`;

const CodePage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === '1234') {  // Remplacez '1234' par le code que vous souhaitez utiliser
      navigate('/home');
    } else {
      alert('Invalid code');
    }
  };

  return (
    <Container>
      <AccessForm onSubmit={handleSubmit}>
        <Title>Enter Access Code</Title>
        <Input 
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
        />
        <Button type="submit">Access</Button>
      </AccessForm>
    </Container>
  );
};

export default CodePage;
