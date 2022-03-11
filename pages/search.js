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
    Heading
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const SearchDiv = styled.div`
    padding: 10px;
`;

function search() {

    // https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
    const router = useRouter();
    const query = router.query.q;
    const [ inputQuery, setInputQuery ] = useState(query || "");
    const [ tickerData, setTickerData ] = useState({});

    // Refactor to use useSWR hook and call API route so that we can use env variables for API key in API route
    // rather than forward env vars in next config!!!!
    useEffect(() => {
        if (query) {
            async function fetchSearchResults() {
                console.log("== Fetching search results for symbol:", query);
                setTickerData(null);
                const response = await fetch(
                    `https://finnhub.io/api/v1/stock/profile2?symbol=${query}&token=${process.env.finnhubApiKey1}`
                );
                const responseBody = await response.json();
                setTickerData(responseBody || {});
            }
    
            fetchSearchResults();
        }
    }, [ query ]);

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
            {tickerData && Object.keys(tickerData).length > 0 && 
            <div>
                <Text>Retrieved {tickerData.ticker} data!</Text>
                <Heading mt={4}>{tickerData.ticker}</Heading>
                <Heading size="md">{tickerData.name}</Heading>
                <Text>Exchange: {tickerData.exchange}</Text>
                <Text>Currency: {tickerData.currency}</Text>
                <Text>Industry: {tickerData.finnhubIndustry}</Text>
                <Text>IPO: {tickerData.ipo}</Text>
            </div>
            }
        </SearchDiv>
    )
}

export default search;