// App.js

import React, {useState , useEffect} from 'react';
import { ChakraProvider, CSSReset, ColorModeProvider, Flex, Center } from '@chakra-ui/react';
import UserProfile from './UserProfile';
import {getAPI} from '../utils/util';
const App = () => {

  const {userInfo, setUserInfo } = useContext(MyContext);
  const [user, setUser] = useState({
    name: '',
    bio: '',
    tags: [],
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() =>  {
    const fetchData = async () => {
      try {
        const apiResponse = await getAPI(`/get_page?username=${userInfo.username}`); // Replace 'user-profile' with your actual API endpoint
        console.log(apiResponse);
        const userData = apiResponse[0]
        console.log(userData);

        console.log(JSON.parse(userData.tags));
        

        //console.log('Parsed User Data:', userData);
        updateUser({
          name: userData.name || '',
          bio: userData.bio || '',
          tags: JSON.parse(userData.tags).tags.split(',').map(tag => tag.trim())
          //tags: userData.tags ? userData.tags.split(',').map(tag => tag.trim()) : [], // Assuming tags is a JSON string
        });
        } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    };
    fetchData()
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <ChakraProvider>
      <CSSReset />
      <ColorModeProvider>
        <Flex minHeight="100vh" align="center" justify="center">
          <Center>
            {console.log("user")}
            {console.log(user.name)}
            <UserProfile user={user} updateUser={updateUser} />
          </Center>
        </Flex>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
