import React, { useRef, useState, useContext, useEffect} from 'react';
import {ChakraProvider, Grid, Alert, Box, Heading, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link as ChakraLink, Select } from '@chakra-ui/react';
import {getAPI, postAPI} from '../utils/util';
import {useNavigate} from 'react-router-dom';
import { MyContext } from '../components/Context';
const LoginPage = () => {
  const {userInfo, setUserInfo } = useContext(MyContext);
  // Fields for the form
  
  const navigate = useNavigate();
  const formFields = ['username', 'password'];
  // 0 = success
  // 1 = fail
  const codeConfig = {
    "0": "Login Successful!",
    "1": "Invalid Login!",
  };
  // Setter and getter for password visibility
  const [show, setShow] = useState(false);
  const [successCode, setSuccessCode] = useState(-1);
  const codeRef = useRef({});
  codeRef.current = successCode;
  const [successVisibility, setSuccessVisibility] = useState(false);
  // Create dictionary for form fields
  const [formData, setFormData] = useState(
    Object.fromEntries(
      formFields.map((formFields) => [formFields, '']) // Initialize form data with empty values
    )
  );

  // Update FormData with input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggles password visibility
  const changeVisibility = () => {
    setShow(!show);
  };


  // Handle submission of form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    postUserInfo();
    setSuccessVisibility(true);
    setTimeout(() => {
      setSuccessVisibility(false);
      if (codeRef.current === 0)
      {
        console.log("navigate");
        setUserInfo({"username": formData["username"]});
        navigate("/Profile");
      }
    }, 5000);
  };

  // API post to send user sign up info on Submit
  const postUserInfo = async() => 
  {
    try {
      const userData = Object.fromEntries(Object.keys(formData).map((key) => [key, formData[key]]));
      const response = await postAPI("/login/", userData);
      setSuccessCode(response);
    } catch (err) {
      console.log(err);
    }}

  return (
    <ChakraProvider>
      {successVisibility && (<Alert justifyContent='center' textAlign='center' status={(successCode === 0) ? "success" : "error"} variant='subtle'>{codeConfig[successCode.toString()]}</Alert>)}
      <Grid
        templateColumns="1fr 2fr 1fr" // Three columns with the middle column being twice the width of the side columns
        gap={6} // Gap between columns
        p={4} // Padding for the whole grid
      >
        <Box p={4}
          w = "400px"
          h = "800px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          boxShadow="lg">
        </Box>
        <Box p={4} maxW="400px" mx="auto">
          <Heading as="h2" mb={6} textAlign="center">
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input name="username" value={formData.username} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input name="password" type={show ? "text" : "password" } value={formData.password} onChange={handleInputChange} />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={changeVisibility}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            <Button type="submit" colorScheme="teal" mb={4} width="100%">
              Login In
            </Button>
            </FormControl>
          </form>
          <Box textAlign="center">
            <ChakraLink color="teal.500" href="/SignUp">
              Create an Account
            </ChakraLink>
          </Box>
        </Box>
        <Box p={4}
          w = "400px"
          h = "800px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          boxShadow="md">
        </Box>
      </Grid>
    </ChakraProvider>
  );

};

export default LoginPage;