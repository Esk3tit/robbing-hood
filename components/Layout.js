import React from 'react';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import styled from '@emotion/styled';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

function Layout({ children }) {
  return (
    <PageContainer>
        <Navbar />
        { children }
        <Footer />
    </PageContainer>
  );
}

export default Layout;