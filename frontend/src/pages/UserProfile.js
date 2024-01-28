// UserProfile.js

import React , { useState, useEffect }from 'react';
import { Box, Heading, Text, VStack, Badge, Divider, Grid , Button, HStack, Input, position} from '@chakra-ui/react';
import { postAPI, getAPI } from '../utils/util';
import EditorComponent from '../components/MarkdownEditor';
import "../index.css"
//import utils from utils;


const UserProfile = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [editedTags, setEditedTags] = useState(user.tags); // Assuming tags are comma-separated

  // NATE ADDED THIS STUFF

  useEffect(() => {
    // window.onload = () => {
    //   handleLoadLogic();
    // };
    if (user.name) {
      handleLoadLogic();
    }
    // const timer = setTimeout(() => {
    //   console.log("run");
    //   console.log(user);
    //   handleLoadLogic();
    // }, 10000);
    // return () => clearTimeout(timer);
  }, [user]);


  const exportPageData = (elements) => {
    let result = JSON.stringify(elements);
    return result;
  }
  
  const importPageData = (pageJson) => {
    let pageData = JSON.parse(pageJson);
    console.log(pageData);
    setElements(pageData);
  }

  const [elements, setElements] = useState([]);
  const [zIndex, setZIndex] = useState(100);

  const spawnImage = () => {
    const newImage = {  
      type: "image",
      id: Date.now(),
      zIndex: zIndex,
      rotation: 0,
      x_pos: 50,
      y_pos: 50,
      width: 150,
      height: 150,
      imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.treehugger.com%2Fthmb%2F3TkFQq0-PZH3FCmFsl-aZ2nW3Bc%3D%2F4086x2724%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fgiant-anteater--myrmecophaga-tridactyla-532346712-a32c4e8bbd80451da0382b8c704df1b6.jpg&f=1&nofb=1&ipt=8913269515359809a4fd1533cc66c7f97debd293c087e6edac26a7217070165c&ipo=images"
    };
    setElements((prevImages) => [...prevImages, newImage]);
    setZIndex((prevZIndex) => prevZIndex - 1);
  };

  const spawnText = () => {
    const newText = { 
      type: "text", 
      id: Date.now(),
      zIndex: zIndex,
      rotation: 0,
      x_pos: 50,
      y_pos: 50,
      width: 150,
      height: 150,
      content: "Double Click To Edit"
    };
    setElements((prevElements) => [...prevElements, newText]);
    setZIndex((prevZIndex) => prevZIndex - 1);
  };

  const moveImage = (id, {x, y}) => {
    setElements((prevImages) =>
      prevImages.map((image) => (image.id === id ? { ...image, x_pos : parseInt(x, 10), y_pos : parseInt(y, 10) } : image))
    );
  };

  const rotateImage = (id, rotation) => {
    rotation = parseInt(rotation.rotation, 10);
    setElements((prevImages) =>
      prevImages.map((image) => (image.id === id ? { ...image, rotation: parseInt(rotation, 10) } : image))
    );
  };

  const changeURL = (id, imageURL) => {
    imageURL = imageURL.url;
    setElements((prevImages) =>
      prevImages.map((image) => (image.id === id ? { ...image, imageURL } : image))
    );
  };

  const changeContent = (id, content) => {
    content = content.content;
    console.log(content);
    setElements((prevElements) =>
      prevElements.map((element) => (element.id === id ? { ...element, content } : element))
    );
  };

  const changeSize = (id, {height, width}) => {
    height = parseInt(height, 10);
    width = parseInt(width, 10);
    setElements((prevImages) =>
      prevImages.map((image) => (image.id === id ? { ...image, height : height, width : width } : image))
    );
  };

  const deleteImage = (id) => {
    setElements((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const handleDoubleTap = (imageId) => {
    const shouldDelete = window.confirm('Do you want to delete this image?\nPress cancel to modify image instead.');
    if (shouldDelete) {
      deleteImage(imageId);
      return true;
    } else {
      return false;
    }
  };

  const handleSaveLogic = async () => {
    const pageData = exportPageData(elements);
    try {
      const pageDataExport = {
        "username": user.name,
        "page_json": JSON.stringify(pageData)
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
        {/* <div style={{fontSize: 50}}>  */}
          <EditorComponent readOnly={false} /> 
        {/* </div>  */}
        

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
