import React from 'react';
import styled from '@emotion/styled';

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

const Btn = styled.button`
    padding: 8px 20px;
    border-radius: 4px;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #ffffff;
        color: #6568F4;
        transition: 250ms;
    }

    &.btn--primary {
        background-color: #3acbf7;
    }

    &.btn--outline {
        background-color: transparent;
        color: #ffffff;
        border: 1px solid #3acbf7;
        transition: all 0.3s ease-out;
    }

    &.btn--medium {
        color: #ffffff;
        font-size: 18px;
    }

    &.btn--large:  {
        padding: 12px 26px;
        color: #ffffff;
        font-size: 20px;
    }

    @media (max-width: 960px) {
        display: none;
    }
`;

export const NavButton = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Btn className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </Btn>
    )
}