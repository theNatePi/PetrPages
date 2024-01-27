// App.js

import React, { useState , useEffect} from 'react';
import { ChakraProvider, CSSReset, ColorModeProvider, Flex, Center } from '@chakra-ui/react';
import UserProfile from './UserProfile';
import getAPI from './utils/util';

function App() {
  const [user, setUser] = useState({
    name: '',
    bio: '',
    tags: [],
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getAPI('/page/?username=petr&school_id=1'); // Replace 'user-profile' with your actual API endpoint
        const userData = apiResponse[0]
        console.log(userData);
        console.log(JSON.parse(userData.tags));
        

        //console.log('Parsed User Data:', userData);

        setUser({
          name: userData.name,
          bio: userData.bio,
          tags: JSON.parse(userData.tags), // Assuming tags is a JSON string
          
        });
        } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <ChakraProvider>
      <CSSReset />
      <ColorModeProvider>
        <Flex minHeight="100vh" align="center" justify="center">
          <Center>
            <UserProfile user={user} updateUser={updateUser} />
          </Center>
        </Flex>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
