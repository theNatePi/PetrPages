import React, { useState, useEffect} from 'react';
import {ChakraProvider, Box, Heading, FormControl, FormLabel, Input, Button, Link as ChakraLink, Select } from '@chakra-ui/react';
import getAPI from './utils/util';


const SignUpPage = () => {
  // Fields for the form
  const formFields = ['username', 'email', 'school_email', 'password', 'school'];

  // stters and getters for school
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create dictionary for form fields
  const [formData, setFormData] = useState(
    Object.fromEntries(
      formFields.map((field) => [field.name, '']) // Initialize form data with empty values
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

  // Handle submission of form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Add your signup logic here
  };

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
            <Input name="password" value={formData.password} onChange={handleInputChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>School</FormLabel>
            <Select
              placeholder="Select your school"
              name="school"
              value={formData.school}
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
          <ChakraLink color="teal.500" href="/login">
            Log in here
          </ChakraLink>
        </Box>
      </Box>
    </ChakraProvider>
  );

};

export default SignUpPage;