import React from "react";
import styled from "@emotion/styled";
import Link from 'next/link';
import { Heading } from "@chakra-ui/react";

const Box = styled.div`
  padding: 80px 60px;
  background: black;
  bottom: 0;
  width: 100%;
  margin-top:auto;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  /* background: red; */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
    cursor: pointer;
  }
`;

const HeadingP = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;

function Footer() {
  return (
    <Box>
      <Heading style={{ color: "green", textAlign: "center", marginTop: "-50px" }}>
        Robbing Hood: Commission-free Stock Viewing App
      </Heading>
      <Container>
        <Row>
          <Column>
            <HeadingP>About Us</HeadingP>
            <Link href="#"><FooterLink>Aim</FooterLink></Link>
            <Link href="#"><FooterLink>Vision</FooterLink></Link>
            <Link href="#"><FooterLink>Testimonials</FooterLink></Link>
          </Column>
          <Column>
            <HeadingP>Services</HeadingP>
            <Link href="#"><FooterLink>Writing</FooterLink></Link>
            <Link href="#"><FooterLink>Internships</FooterLink></Link>
            <Link href="#"><FooterLink>Coding</FooterLink></Link>
            <Link href="#"><FooterLink>Teaching</FooterLink></Link>
          </Column>
          <Column>
            <HeadingP>Contact Us</HeadingP>
            <Link href="#"><FooterLink>Khai Phan</FooterLink></Link>
            <Link href="#"><FooterLink>Scot Rein</FooterLink></Link>
            <Link href="#"><FooterLink>Nelson Van der Lindt</FooterLink></Link>
          </Column>
          <Column>
            <HeadingP>Social Media</HeadingP>
            <Link href="#"><FooterLink>
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink></Link>
            <Link href="#"><FooterLink>
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink></Link>
            <Link href="#"><FooterLink>
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink></Link>
            <Link href="#"><FooterLink>
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink></Link>
          </Column>
        </Row>
      </Container>
    </Box>
  );
}

export default Footer;
