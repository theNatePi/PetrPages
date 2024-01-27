import React, { useState } from 'react';
import { Select, ChakraProvider, Box, Heading, FormControl, FormLabel, Input, Button, Link as ChakraLink } from '@chakra-ui/react';

const formFields = ['username', 'email', 'student_email', 'password', 'school'];
const SignUpPage = () => {
  const [formData, setFormData] = useState(
    Object.fromEntries(
      formFields.map((field) => [field, '']) // Initialize form data with empty values
    )
  );

  const countries = [
    'USA',
    'Canada',
    'UK',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India',
    // Add more countries as needed
  ];

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('https://api.example.com/countries')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setLoading(false);
      });
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Form submitted with data:', formData);
    // You can make API calls or perform other actions for signup
  };

  return (
    <ChakraProvider>
      <Box p={4} maxW="400px" mx="auto">
        <Heading as="h2" mb={6} textAlign="center">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input type="username" name="username" value={formData.username} onChange={handleInputChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Student Email</FormLabel>
            <Input name="student_email" value={formData.student_email} onChange={handleInputChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Country</FormLabel>
            <Select
              placeholder="Select your country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              maxH="80px" // Set the maximum height for the dropdown
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
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
