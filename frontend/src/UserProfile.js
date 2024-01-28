// UserProfile.js

import React , { useState, useEffect }from 'react';
import { Box, Heading, Text, VStack, Badge, Divider, Grid , Button, HStack, Input} from '@chakra-ui/react';
import ImageComponent from './components/ImageComp';
import { postAPI, getAPI } from './utils/util';
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
    console.log("user", user);
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


  const exportPageData = (images) => {
    let result = JSON.stringify(images);
    return result;
  }
  
  const importPageData = (pageJson) => {
    let pageData = JSON.parse(pageJson);
    console.log(pageData);
    setImages(pageData);
  }

  const [images, setImages] = useState([]);
  const [zIndex, setZIndex] = useState(100);

  const spawnImage = () => {
    const newImage = {  
      id: Date.now(),
      zIndex: zIndex,
      rotation: 90,
      x_pos: 150,
      y_pos: 150,
      width: 150,
      height: 150,
      imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.treehugger.com%2Fthmb%2F3TkFQq0-PZH3FCmFsl-aZ2nW3Bc%3D%2F4086x2724%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fgiant-anteater--myrmecophaga-tridactyla-532346712-a32c4e8bbd80451da0382b8c704df1b6.jpg&f=1&nofb=1&ipt=8913269515359809a4fd1533cc66c7f97debd293c087e6edac26a7217070165c&ipo=images"
    };
    setImages((prevImages) => [...prevImages, newImage]);
    setZIndex((prevZIndex) => prevZIndex - 1);
  };

  const moveImage = (id, {x, y}) => {
    setImages((prevImages) =>
      prevImages.map((image) => (image.id === id ? { ...image, x_pos : parseInt(x, 10), y_pos : parseInt(y, 10) } : image))
    );
  };

  const rotateImage = (id, rotation) => {
    rotation = parseInt(rotation.rotation, 10);
    setImages((prevImages) =>
      prevImages.map((image) => (image.id === id ? { ...image, rotation: parseInt(rotation, 10) } : image))
    );
  };

  const changeURL = (id, imageURL) => {
    console.log(imageURL);
    imageURL = imageURL.url;
    setImages((prevImages) =>
      prevImages.map((image) => (image.id === id ? { ...image, imageURL } : image))
    );
  };

  const changeSize = (id, {height, width}) => {
    height = parseInt(height, 10);
    width = parseInt(width, 10);
    setImages((prevImages) =>
      prevImages.map((image) => (image.id === id ? { ...image, height : height, width : width } : image))
    );
  };

  const deleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
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
    const pageData = exportPageData(images);
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
  const handleSaveClick = () => {
    // Implement your logic to save the edited bio
    // For now, let's just log the edited bio
    console.log('Saving bio:', editedBio);
    updateUser({ ...user, bio: editedBio });


    setIsEditing(false);
  };
  
  const handleToggleEditTags = () => {
    setIsEditingTags(!isEditingTags);
  };

  const handleSaveTagsClick = () => {
    // Split the edited tags string into an array
    const updatedTags = editedTags.split(',').map(tag => tag.trim());
    updateUser({ ...user, tags: updatedTags });
    setIsEditingTags(false);
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
          <Button size="sm" colorScheme="teal" onClick={handleSaveTagsClick}>
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
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {images.map((image) => (
            <div key={image.id}>
              <ImageComponent id={image.id} 
              m_zIndex={image.zIndex}
              m_rotation={image.rotation}
              m_x={image.x_pos}
              m_y={image.y_pos}
              m_width={image.width}
              m_height={image.height}
              m_imageURL={image.imageURL}
              onMoveUpdate={(x, y) => moveImage(image.id, { x, y })}
              onRotate={(rotation) => rotateImage(image.id, {rotation})}
              onChangeURL={(url) => changeURL(image.id, {url})}
              onChangeSize={(height, width) => changeSize(image.id, { height, width })}
              onDoubleTap={() => handleDoubleTap(image.id)}/>
            </div>
          ))}
        </div>
        

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
