import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { Heading, Text } from '@chakra-ui/react';

const StyledA = styled.a`
    text-decoration: underline;
    color: #4979ff;
    cursor: pointer;
`;

function NotFound() {
  return (
    <div className='not-found' style={{ textAlign: "center" }}>
        <Heading as='h1'>L + Ratio + 404 + Cringe</Heading>
        <Heading as='h2' size='lg'>You done diddly done goofed, or that page cannot be found.</Heading>
        <Text>Go back to <Link href="/dashboard"><StyledA>dashboard</StyledA></Link></Text>
    </div>
  );
}

export default NotFound;