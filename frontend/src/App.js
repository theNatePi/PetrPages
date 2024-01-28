import { Routes, Route } from 'react-router-dom'
import SignUpPage from './SignUp';
import App_profile from './App_profile';
const App = () => {
  return (
    <>
    <Routes>
      <Route index element={<SignUpPage />} />
      <Route path="/Sign_Up" element={<SignUpPage />} />
      <Route path="/Profile" element={<App_profile />} />
    </Routes>
    </>
  );
};
export default App;
