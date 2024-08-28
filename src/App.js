import './App.css';
import UploadForm from './composants/UploadForm';
import PhotoGallery from './composants/PhotoGallery';
import HomePage from './composants/home/HomePage.js';
import CodePage from './composants/code/CodePage.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<CodePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/gallery" element={<PhotoGallery />} />
    </Routes>
</Router>
  );
};

export default App;
