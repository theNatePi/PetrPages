import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUp';
import App_profile from './pages/App_profile';
import { ChakraBaseProvider } from '@chakra-ui/react';
const App = () => {
  return (
    <ChakraBaseProvider>
      <Routes>
        <Route index element={<SignUpPage />} />
        <Route path="/Sign_Up" element={<SignUpPage />} />
        <Route path="/Profile" element={<App_profile />} />
      </Routes>
    </ChakraBaseProvider>
  );
};
export default App;