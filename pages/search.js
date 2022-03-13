import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    HStack,
    Button,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Heading,
    List,
    ListItem,
    ListIcon,
    Link
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import useStockProfile from '../hooks/useStockProfile';
import useStockPeers from '../hooks/useStockPeers';
import { FaSearch } from 'react-icons/fa';
import NextLink from 'next/link';

const SearchDiv = styled.div`
    padding: 10px;
`;

function Search() {

    // https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
    const router = useRouter();
    const query = router.query.q;
    const [ inputQuery, setInputQuery ] = useState(query || "");

    console.log(`Query Param: ${query}`);
    console.log(`Input Query: ${inputQuery}`)

    const { profile } = useStockProfile(query);
    const { peers } = useStockPeers(query);

    return (
        <SearchDiv>
            <form onSubmit={e => {
                e.preventDefault();
                router.push(`${router.pathname}?q=${inputQuery}`);
            }}>
                <FormControl>
                    <FormLabel htmlFor='search'>Stock Ticker/Symbol Search</FormLabel>
                    <HStack>
                        <Input
                            id='search'
                            placeholder='Enter ticker (ex. AAPL)'
                            value={inputQuery}
                            onChange={e => setInputQuery(e.target.value)}
                        />
                        <Button type="submit" colorScheme="blue">Search</Button>
                    </HStack>
                    <FormHelperText>Ticker symbols or stock symbols are arrangements of symbols or characters representing specific assets or securities listed on a stock exchange or traded publicly (Ex. Apple = AAPL).</FormHelperText>
                </FormControl>
            </form>
            {profile && 
            <div>
                <Heading mt={4}>{profile.ticker}</Heading>
                <Heading size="md">{profile.name}</Heading>
                <Text>Exchange: {profile.exchange}</Text>
                <Text>Currency: {profile.currency}</Text>
                <Text>Industry: {profile.finnhubIndustry}</Text>
                <Text>IPO: {profile.ipo}</Text>
            </div>
            }
            {peers &&
            <>
                <Text>
                    Related stocks:
                </Text>
                <List>
                    {peers.map((peer, index) => (
                        <ListItem key={index}>
                            <ListIcon as={FaSearch} />
                            <NextLink href={`/search?q=${peer}`} passHref>
                                <Link>{peer}</Link>
                            </NextLink>
                        </ListItem>
                    ))}
                </List>
            </>
                
            }
        </SearchDiv>
    )
}

export default Search;