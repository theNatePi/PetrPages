import { createContext } from 'react';

export const MyContext = createContext("");
// Global variable
// Example:
// Must import useContext from React
// Must import MyContext from this file
// const {userInfo, setUserInfo } = useContext(MyContext);
// setUserInfo({"key": "Signup"});