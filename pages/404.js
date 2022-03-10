import React from 'react';
import NextLink from 'next/link';
import styled from '@emotion/styled';

import { Heading, Text, Link } from '@chakra-ui/react';

const StyledA = styled.a`
    color: #4979ff;
`;

function NotFound() {
  return (
    <div className='not-found' style={{ textAlign: "center" }}>
        <Heading as='h1'>L + Ratio + 404 + Cringe</Heading>
        <Heading as='h2' size='lg'>You done diddly done goofed, or that page cannot be found.</Heading>
        <Text>
            <NextLink href="/dashboard" passHref>
                <Link>
                    <StyledA>
                        Go back to dashboard
                    </StyledA>
                </Link>
            </NextLink>
        </Text>
    </div>
  );
}

export default NotFound;