// UserProfile.js

import React from 'react';
import { Box, Heading, Text, VStack, Badge, Divider, Grid , Button} from '@chakra-ui/react';

const UserProfile = ({ user }) => {
  
  const handleButtonClick = () => {
    // This function will be executed when the button is clicked
    alert('Button clicked!'); // Replace this with your desired action
  };
  return (
    <Grid
      templateColumns="1fr 2fr 1fr" // Three columns with the middle column being twice the width of the side columns
      gap={6} // Gap between columns
      p={4} // Padding for the whole grid
    >
      {/* Left Block */}
      <Box p={4}
      w = "400px"
      h = "8000px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="lg">
      <Box
        p={3}
        w = "350px"
        h = "100px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg">
        <VStack align="start" spacing="2">
          <Heading size="xl">{user.name}</Heading>
          <Text>{user.bio}</Text>
        </VStack>
        </Box>
      
      
        <Divider my="4" borderWidth="1px" borderColor="gray.300" />
        <Box
        p={3}
        w = "350px"
        h = "100px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg">
        {user.tags && user.tags.length > 0 && (
          <VStack align="start" spacing="2">
            <Text fontWeight="bold">Tags:</Text>
            <VStack align="start" spacing="1">
              {user.tags.map((tag, index) => (
                <Badge key={index} colorScheme="blue">
                  {tag}
                </Badge>
              ))}
            </VStack>
          </VStack>
        )}
        </Box>

        <Divider my="4" borderWidth="1px" borderColor="gray.300" />

        <Box
        p={3}
        w = "350px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg">
        <VStack align="start" spacing="2">
          <Text>Lorem ipsum dolor sit amet,  </Text>
        </VStack>
        </Box>

        {/* Content for the left block */}
      </Box>

      {/* Main Profile (Center) */}
      <Box
        p={50}
        w = "700px"
        h = "8000px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg"
      >
        

      </Box>

      {/* Right Block */}
      <Box p={4}
      maxW = "250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md">
        
        {/* Content for the right block */}
        <Box
        p={3}
        w = "215px"
        
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg">
        <Text>/r Fortnite</Text>
        {/* Button */}
        <Button mt="4" colorScheme="teal"  onClick={handleButtonClick}>
          Communites
        </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default UserProfile;
