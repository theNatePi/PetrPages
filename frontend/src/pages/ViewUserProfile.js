// ViewUserProfile.js

import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Badge, Divider, Grid, Button, HStack, Link, Center } from '@chakra-ui/react';
import { getAPI } from '../utils/util';
import EditorComponent from '../components/MarkdownEditor';
import { set } from 'lodash';
import { useParams } from 'react-router-dom';

const ViewUserProfile = ({ match }) => {
  const [user, setUser] = useState({
    name: '',
    bio: '',
    tags: [],
  });

  const [passableUsername, setPassableUsername] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usernameParam = localStorage.getItem('searchedUser');
        console.log("HERE", usernameParam);
        setPassableUsername(usernameParam);
        console.log("HERE2", passableUsername);
        const apiResponse = await getAPI(`/get_page/?username=${usernameParam}&school_id=1`);
        
        //const apiResponse = await getAPI('/get_page/?username=Bowen&school_id=1');
        const userData = apiResponse[0];

        setUser({
          name: userData.name || '',
          bio: userData.bio || '',
          tags: JSON.parse(userData.tags).tags.split(',').map(tag => tag.trim()),
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [passableUsername, setPassableUsername]);

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
        w = "365px"
        h = "200px"
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
      
            {/* tags */}
        <Divider my="4" borderWidth="1px" borderColor="gray.300" />
        <Box
        p={3}
        w = "365px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg">
        (
          <VStack align="start" spacing="2">
              <Text fontWeight="bold">Tags:</Text>
              <VStack align="start" spacing="1">
                {user.tags && Array.isArray(user.tags) && user.tags.map((tag, index) => (
                  <Badge key={index} colorScheme="blue">
                    {tag}
                  </Badge>
                ))}
              </VStack>
            </VStack>
        )
        </Box>

        <Divider my="4" borderWidth="1px" borderColor="gray.300" />

        {/* <Box
        p={3}
        w = "365px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg">
        <VStack align="start" spacing="2"> 
        <Text>Edit your page!</Text>
          <Button size="sm" colorScheme="teal" onClick={spawnImage}>
            Add Image
          </Button>
          <Button size="sm" colorScheme="teal" onClick={spawnText}>
            Add Text
          </Button>
          <Button size="sm" colorScheme="teal" onClick={handleSaveTagsClick}>
            Add Button
          </Button>
          <Button size="sm" colorScheme="green" onClick={handleSaveLogic}>
            Save
          </Button>
        </VStack>
        </Box> */}

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
      <EditorComponent readOnly={true} username={localStorage.getItem('searchedUser')}/>
    </Box>

      {/* Right Block */}
      <Box p={4}
      maxW = "500px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md">
      </Box>



    </Grid>
  );
};

export default ViewUserProfile;
