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
    Link,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Divider,
    Container 
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import useStockProfile from '../hooks/useStockProfile';
import useStockPeers from '../hooks/useStockPeers';
import { FaSearch } from 'react-icons/fa';
import NextLink from 'next/link';
import useStockQuote from '../hooks/useStockQuote';
import useStockRecommendations from '../hooks/useStockRecommendations';

import { parse, format } from 'date-fns';

const SearchDiv = styled.div`
    padding: 10px;
`;

function Search() {

    // https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
    const router = useRouter();
    const query = router.query.q;
    const [ inputQuery, setInputQuery ] = useState(query || "");

    const { profile } = useStockProfile(query);
    const { peers } = useStockPeers(query);
    const { quote } = useStockQuote(query);
    const { recommendations } = useStockRecommendations(query);

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
            {quote && 
            <StatGroup>
                <Stat>
                    <StatLabel>Current Price</StatLabel>
                    <StatNumber>${quote.c}</StatNumber>
                    <StatHelpText>
                        <HStack height='50px'>
                            <div>
                                <StatArrow type={quote.d > 0 ? 'increase' : 'decrease'} />
                                ${quote.d}
                            </div>
                            <div>
                                <StatArrow type={quote.dp > 0 ? 'increase' : 'decrease'} />
                                {quote.dp}%
                            </div>
                        </HStack>
                    </StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>High Price of the Day</StatLabel>
                    <StatNumber>${quote.h}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Low Price of the Day</StatLabel>
                    <StatNumber>${quote.l}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Open Price of the Day</StatLabel>
                    <StatNumber>${quote.o}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Previous Close Price</StatLabel>
                    <StatNumber>${quote.pc}</StatNumber>
                </Stat>
            </StatGroup>
            }
            {recommendations &&
                <Table>
                    <TableCaption>Analyst recommendation trends for the previous {recommendations.length} months (# of analysts per category)</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Month</Th>
                            <Th isNumeric>Buy</Th>
                            <Th isNumeric>Hold</Th>
                            <Th isNumeric>Sell</Th>
                            <Th isNumeric>Strong Buy</Th>
                            <Th isNumeric>Strong Sell</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recommendations.map(rec => {
                            const date = parse(rec.period, "yyyy-MM-dd", new Date());
                            const finalDate = format(date, "MMMM yyyy");

                            return (
                                <Tr>
                                    <Td>{finalDate}</Td>
                                    <Td isNumeric>{rec.buy}</Td>
                                    <Td isNumeric>{rec.hold}</Td>
                                    <Td isNumeric>{rec.sell}</Td>
                                    <Td isNumeric>{rec.strongBuy}</Td>
                                    <Td isNumeric>{rec.strongSell}</Td>
                                </Tr>
                            )})
                        }
                    </Tbody>
                </Table>
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