// App.js

import React from 'react';
import { ChakraProvider, CSSReset, ColorModeProvider, Flex, Center } from '@chakra-ui/react';
import UserProfile from './UserProfile';

const user = {
  name: 'Bowen Wang',
  bio: 'Testing User Profile',
  tags: ['Fortnite', 'League of Legend'],
};

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <ColorModeProvider>
        <Flex minHeight="100vh" align="center" justify="center">
          <Center>
            <UserProfile user={user} />
          </Center>
        </Flex>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
