import Link from 'next/link';
import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { NavButton } from './NavButton';
import { Icon } from '@chakra-ui/react';

import { FaBars, FaTimes } from 'react-icons/fa';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Nav = styled.nav`
    background-color: purple;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;

    @media (max-width: 960px) {
        position: relative;
    }
`;

const NavBarLogo = styled.h1`
    color: #ffffff;
    justify-self: start;
    margin-left: 20px;
    cursor: pointer;

    @media (max-width: 960px) {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(25%, 50%);
    }
`;

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    list-style: none;
    text-align: center;
    width: 70vw;
    justify-content: end;
    margin-right: 2rem;

    &.nav-menu {
        @media (max-width: 960px) {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            width: 100%;
            height: 60vh;
            position: absolute;
            top: 80px;
            left: -100%;
            opacity: 1;
            transition: all 0.5s ease;
        }

        &.active {
            @media (max-width: 960px) {
                background: #6668f4;
                z-index: 1;
                left: 0;
                opacity: 1;
                transition: all 0.5s ease;
            }
        }
    }
`;

const NavLink = styled.a`
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
        background-color: #6d76f7;
        border-radius: 4px;
        transition: all 0.2s ease-out;

        @media (max-width: 960px) {
            background-color: #7577fa;
            border-radius: 0;
        }
    }

    &.mobile {
        display: none;

        @media (max-width: 960px) {
            display: block;
            text-align: center;
            padding: 1.5rem;
            margin: 2rem auto;
            border-radius: 4px;
            width: 80%;
            background: #4ad9e4;
            text-decoration: none;
            color: #ffffff;
            font-size: 1.5rem;
        }

        &:hover {
            background: #ffffff;
            color: #6568f4;
            transition: 250ms;
        }
    }

    @media (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;
        transition: all 0.5s ease;
    }
`;

const MenuIconDiv = styled.div`
    display: none;

    @media (max-width: 960px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

const MenuIcon = styled(Icon)`
    color: #ffffff;
`

function Navbar() {

    const [ menuClicked, setMenuClicked ] = useState(false);

    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault()
        router.push("/users/signup")
    }

    return (
        <Nav>
            <NavBarLogo className='navbar-logo'>Robbing Hood</NavBarLogo>
            <MenuIconDiv className='menu-icon' onClick={() => setMenuClicked(!menuClicked)}>
                <MenuIcon as={menuClicked ? FaTimes : FaBars} />
            </MenuIconDiv>
            <List className={menuClicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link href={item.url}>
                                <NavLink className={item.cName}>
                                    {item.title}
                                </NavLink>
                            </Link>
                        </li>
                    )
                })}
            </List>
            <NavButton onClick={handleClick}>Sign Up</NavButton>
        </Nav>
    )
}

export default Navbar;