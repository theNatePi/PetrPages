// UserProfile.js

import React , { useState, useEffect }from 'react';
import { Box, Heading, Text, VStack, Badge, Divider, Grid , Button, HStack, Input, position, useRangeSlider} from '@chakra-ui/react';
import { postAPI, getAPI } from '../utils/util';
import EditorComponent from '../components/MarkdownEditor';
import "../index.css"
//import utils from utils;


const UserProfile = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [editedTags, setEditedTags] = useState(user.tags); // Assuming tags are comma-separated


  const [pageContents, updatePageContents] = useState([]);

  // NATE ADDED THIS STUFF


  const exportPageData = (exportedContents) => {
    let result = JSON.stringify(exportedContents);
    return result;
  }
  
  const importPageData = (pageJson) => {
    let pageData = JSON.parse(pageJson);
    console.log(pageData);
  }

  const handleSaveLogic = async () => {
    const pageData = exportPageData(pageContents);
    try {
      const pageDataExport = {
        "username": user.name,
        "page_json": pageData
      }
      console.log(pageDataExport);
      const response = await postAPI("/save_page/", pageDataExport);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadLogic = async () => {
    try {
      const response = await getAPI(`/load_page?username=${user.name}`);
      importPageData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    if (user.name) {
      // handleLoadLogic();
    }

    window.scrollTo(0, 0);
  }, [user]);




  // END STUFF NATE ADDED

  
  const handleButtonClick = () => {
    // This function will be executed when the button is clicked
    alert('Button clicked!'); // Replace this with your desired action

  };
  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const handleSaveClick = async () => {
    // Trim leading and trailing spaces from editedBio
    const trimmedBio = editedBio.trim();

    // Update user with updated bio
    updateUser({ ...user, bio: trimmedBio });

    // Make an API request to update user bio
    try {
      await postAPI('/update_bio', { "username":user.name, "bio": trimmedBio }); // Replace 'id' and '/update-bio' with your actual identifier and API path
      console.log('User bio updated successfully!');
    } catch (error) {
      console.error('Error updating user bio:', error);
    }

    // Set isEditing to false
    setIsEditing(false);
  };
  
  const handleToggleEditTags = () => {
    setIsEditingTags(!isEditingTags);
  };
  const handleSaveTagsClick = async () => {
    try {
      // Split the edited tags string into an array
      if (isEditingTags) {
        // Split the edited tags string into an array
        const updatedTags = editedTags.split(',').map(tag => tag.trim()) || [];
        const updatedTagsString = updatedTags.join(',');
        
        updateUser({ ...user, tags: updatedTags });
        
        // Make the API call to update tags
        await postAPI('/update_tags', {
          "username": user.name,
          "tags": updatedTagsString,
        });
        // if (!response.ok) {
        //   throw new Error('Failed to update tags');
        // }

        // Update the local state
      }

      // Close the tags editing mode

    } catch (error) {
      console.error('Error updating tags:', error);
    }finally {
      // Close the tags editing mode
      setIsEditingTags(false)
    }
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
        w = "365px"
        h = "200px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg">
         <VStack align="start" spacing="2">
            <HStack justify="space-between" w="100%">
              <Heading size="xl">{user.name}</Heading>

              {isEditing ? (
                <Button size="sm" colorScheme="teal" onClick={handleSaveClick}>
                  Save
                </Button>
              ) : (
                <Button size="sm" colorScheme="teal" onClick={handleToggleEdit}>
                  Edit
                </Button>
              )}
            </HStack>
            {isEditing ? (
              <Input
                type="text"
                name="bio"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                placeholder="Edit bio"
              />
            ) : (
              <Text>{user.bio}</Text>
            )}
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

        {isEditingTags ? (
            <VStack align="start" spacing="2">
              <HStack justify="space-between" w="100%">
                <Text fontWeight="bold">Edit Tags:</Text>
                <Button size="sm" colorScheme="teal" onClick={handleSaveTagsClick}>
                  Save Tags
                </Button>
              </HStack>
              <Input
                type="text"
                name="tags"
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
                placeholder="Edit tags (comma-separated)"
              />
            </VStack>
          ) : (
            <VStack align="start" spacing="2">
              <Text fontWeight="bold">Tags:</Text>
              <VStack align="start" spacing="1">
                {user.tags && Array.isArray(user.tags) && user.tags.map((tag, index) => (
                  <Badge key={index} colorScheme="blue">
                    {tag}
                  </Badge>
                ))}
              </VStack>
              <Button size="sm" colorScheme="teal" onClick={handleToggleEditTags}>
                Edit Tags
              </Button>
            </VStack>
        )}
        </Box>

        <Divider my="4" borderWidth="1px" borderColor="gray.300" />

        <Box
        p={3}
        w = "365px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="lg">
        <VStack align="start" spacing="2"> 
        <Text>Edit your page!</Text>
          <Button size="sm" colorScheme="green" onClick={handleSaveLogic}>
            Save
          </Button>
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
          <EditorComponent readOnly={false} pageContents={pageContents} updatePageContents={updatePageContents} username={user.name}/>
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
