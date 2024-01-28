import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUp';
import App_profile from './pages/App_profile';
import { ChakraBaseProvider } from '@chakra-ui/react';
import {useState} from "react";
import LoginPage from './pages/Login';
import MusicUploader from './components/MusicUpload';
import MusicPlayer from './components/MusicPlayer';
const App = () => {
  return (
    <div>
      <ChakraBaseProvider>
        <Routes>
          <Route index element={<SignUpPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Profile" element={<App_profile />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/MusicUpload" element={<MusicUploader />} />
          <Route path="/MusicPlay" element={<MusicPlayer />} />
        </Routes>
      </ChakraBaseProvider>
    </div>
  );
};
export default App;
