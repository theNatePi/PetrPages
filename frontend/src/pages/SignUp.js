import React, { useState, useEffect, useRef} from 'react';
import {ChakraProvider, Grid, Alert, Box, Heading, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link as ChakraLink, Select } from '@chakra-ui/react';
import {getAPI, postAPI} from '../utils/util';
import {useNavigate} from 'react-router-dom';
const SignUpPage = () => {
  const navigate = useNavigate();
  // Fields for the form
  const formFields = ['username', 'email', 'school_email', 'password', 'school_id'];
  const codeConfig = {
    "-1": "Failed Sign Up!",
    "0": "Username is taken!",
    "1": "Invalid school email!",
    "2": "Successful Sign Up!"
  };
  // stters and getters for school
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
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
    // Add your signup logic here
    formData["school_id"] = parseInt(formData["school_id"]);
    postUserInfo();
    setSuccessVisibility(true);
    setTimeout(() => {
      setSuccessVisibility(false);
      console.log(codeRef.current);
      if (codeRef.current === 2)
      {
        console.log("navigate");
        navigate("/Login");
      }
    }, 3000);
  };

  // API post to send user sign up info on Submit
  const postUserInfo = async() => 
  {
    try {
      const userData = Object.fromEntries(Object.keys(formData).map((key) => [key, formData[key]]));
      const response = await postAPI("/create_user/", userData);
      setSuccessCode(response);
    } catch (err) {
      console.log(err);
    }}

  // API call to load colleges  
  useEffect(() => async () => {
    try {
      const response = await getAPI("/schools/");
      console.log(response);
      setSchools(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }}
  , []);


  return (
    <ChakraProvider>
      {successVisibility && (<Alert justifyContent='center' textAlign='center' status={(successCode === 2) ? "success" : "error"} variant='subtle'>{codeConfig[successCode.toString()]}</Alert>)}
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
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input name="username" value={formData.username} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input name="email" value={formData.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>School Email</FormLabel>
              <Input name="school_email" value={formData.school_email} onChange={handleInputChange} />
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
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>School</FormLabel>
              <Select
                placeholder="Select your school"
                name="school_id"
                value={formData.school_id}
                onChange={handleInputChange}
                maxH="80px"
              >
                {loading ? (
                  <option>Failed to load schools...</option>
                ) : (
                  Object.values(schools).map((college) => (
                    <option key={college.name} value={college.id}>
                      {college.name}
                    </option>
                  ))
                )}
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="teal" mb={4} width="100%">
              Sign Up
            </Button>
          </form>
          <Box textAlign="center">
            Already have an account?{' '}
            <ChakraLink color="teal.500" href="/Login">
              Log in here
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

export default SignUpPage;