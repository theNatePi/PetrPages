import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, FormControl, FormLabel, Input, Button, Link as ChakraLink } from '@chakra-ui/react';


const formFields = ['username', 'email', 'school email', 'password', 'school'];

const SignUpPage = () => {
  const [formData, setFormData] = useState(
    Object.fromEntries(
      formFields.map((field) => [field.name, '']) // Initialize form data with empty values
    )
  );


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Add your signup logic here
  };

  return (
    <ChakraProvider>
      <Box p={4} maxW="400px" mx="auto">
        <Heading as="h2" mb={6} textAlign="center">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <FormControl key={field} mb={4}>
              <FormLabel>{(field.slice(0,1).toUpperCase()).concat(field.slice(1))}</FormLabel>
              <Input
                type={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
              />
            </FormControl>
          ))}
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