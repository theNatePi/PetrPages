import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUp';
import App_profile from './pages/App_profile';
import { ChakraBaseProvider } from '@chakra-ui/react';
import {useState} from "react";
import LoginPage from './pages/Login';
import "./index.css"

const App = () => {
  return (
    <div>
      <ChakraBaseProvider>
        <Routes>
          <Route index element={<SignUpPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Profile" element={<App_profile />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </ChakraBaseProvider>
    </div>
  );
};
export default App;
