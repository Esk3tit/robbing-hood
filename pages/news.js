import React from 'react';
import useStockNews from '../hooks/useStockNews';
import { Flex, Spacer } from '@chakra-ui/react';
import NewsPost from '../components/NewsPost/NewsPost';

function News({ news }) {
  return (
    <Flex direction="row" wrap="wrap" justify="space-evenly">
      { news.map(post => <NewsPost key={post.id} {...post} />)}
    </Flex>
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