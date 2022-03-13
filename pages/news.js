import React, { useState, useEffect } from 'react';
import { 
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Box,
  Button,
  HStack,
  Center,
  Spinner
} from '@chakra-ui/react';
import NewsPost from '../components/NewsPost/NewsPost';

function News({ news }) {

  const [category, setCategory] = useState("general");
  const [newsPosts, setNewsPosts] = useState(news);

  const refreshNews = async () => {
    setNewsPosts(null);
    const res = await fetch('/api/newsfetcher', {
      method: 'POST',
      body: JSON.stringify({
        category: category
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const resBody = await res.json();
    console.log(resBody);
    setNewsPosts(resBody);
  }

  return (
    <div>
      <Center>
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='8px' my='8px'>
          <FormControl>
            <FormLabel htmlFor='category'>News Category</FormLabel>
            <HStack>
              <Select
                id='category'
                onChange={e => setCategory(e.target.value)}
                value={category}
              >
                <option value='general'>General</option>
                <option value='forex'>Forex</option>
                <option value='crypto'>Crypto</option>
                <option value='merger'>Merger</option>
              </Select>
              <Button
                mt={4}
                colorScheme='teal'
                onClick={refreshNews}
              >
                Refresh
              </Button>
            </HStack>
            <FormHelperText>Select news category to display and then click refresh to see new results (General is default category).</FormHelperText>
          </FormControl>
        </Box>
      </Center>
      {newsPosts ? 
        <Flex direction="row" wrap="wrap" justify="space-evenly">
          {newsPosts.map(post => <NewsPost key={post.id} {...post} />)}
        </Flex>
          : 
        <Center>
          <Spinner size='xl' thickness='4px' />
        </Center>
      }
      
    </div>
  )
}

export async function getServerSideProps(context) {

  const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${process.env.FINNHUB_API_KEY_1}`);
  const resBody = await res.json();

  return {
    props: { news: resBody } // will be passed to the page component as props
  }
}

export default News;