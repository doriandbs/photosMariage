import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  position: relative;
  padding: 20px;
  background: linear-gradient(135deg, #fdfdfd, #2c3e50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #333;
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

const FormTitle = styled.h2`
  font-size: 2.5em;
  color: #f1d3cf;
  margin-bottom: 30px;
  font-family: 'Great Vibes', cursive;
  text-shadow: 0px 0px 5px #f1d3cf;
`;

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const Label = styled.label`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  margin-bottom: 20px;
  border: 2px solid #f1d3cf;
  border-radius: 10px;
  width: 100%;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2c3e50;
  }
`;

const SubmitButton = styled.button`
  background-color: #f1d3cf;
  border: none;
  padding: 10px 20px;
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

const Message = styled.p`
  margin-top: 20px;
  font-size: 1em;
  color: ${props => (props.error ? 'red' : 'green')};
`;

const UploadForm = () => {
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('photo', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        setMessage('Upload failed.');
      }
    } catch (error) {
      setMessage('An error occurred during the upload.');
    }
  };

  const handleBackClick = () => {
    navigate('/home');
  };

  return (
    <FormContainer>
      <BackButton onClick={handleBackClick}>Back to Home</BackButton>
      <FormTitle>Upload a Photo</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>Category:</Label>
        <Input 
          type="text" 
          value={category} 
          onChange={handleCategoryChange} 
          placeholder="e.g., Wedding, Birthday"
        />
        <Label>Photo:</Label>
        <Input type="file" onChange={handleFileChange} />
        <SubmitButton type="submit">Upload</SubmitButton>
      </Form>
      {message && <Message>{message}</Message>}
    </FormContainer>
  );
};

export default UploadForm;
