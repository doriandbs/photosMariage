import './App.css';
import UploadForm from './composants/UploadForm';
import PhotoGallery from './composants/PhotoGallery';
import HomePage from './composants/home/HomePage.js';
import CodePage from './composants/code/CodePage.js';
import CategorySelection from './composants/category/CategorySelection.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<CodePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categories" element={<CategorySelection />} />
        <Route path="/gallery/:category" element={<PhotoGallery />} />
        <Route path="/upload" element={<UploadForm />} />
    </Routes>
</Router>
  );
};

export default App;
