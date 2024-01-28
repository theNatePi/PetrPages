import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUp';
import App_profile from './pages/App_profile';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { MyContext } from "./components/Context";
import {useState} from "react";
const App = () => {
  const [userInfo, setUserInfo] = useState({
    "key": "value"
  });
  return (
    <div>
      <MyContext.Provider value={{ userInfo, setUserInfo}}>
        <ChakraBaseProvider>
          <Routes>
            <Route index element={<SignUpPage />} />
            <Route path="/Sign_Up" element={<SignUpPage />} />
            <Route path="/Profile" element={<App_profile />} />
          </Routes>
        </ChakraBaseProvider>
      </MyContext.Provider>
    </div>
  );
};
export default App;