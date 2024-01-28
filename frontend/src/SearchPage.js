// SearchPage.js
import React, { useState } from 'react';
import { Input, Button, Flex, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import {getAPI, postAPI} from './utils/util';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const userSchoolID = 1;

  const handleSearch = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to use
      const response = await getAPI(`/pages?tag_name=${searchText}&school_id=${userSchoolID}`);

      setSearchResult(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  };

  return (
    <Flex direction="column" align="center" mt={8}>
      <Input
        placeholder="Enter text to search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        mb={4}
      />
      <Button colorScheme="teal" onClick={handleSearch}>
        Search
      </Button>
        <Flex mt={4} justify="space-around" wrap="wrap">
          {searchResult.map((result) => (
            <text>gi</text>
          ))}
        </Flex>
      
    </Flex>
  );
};

export default SearchPage;
