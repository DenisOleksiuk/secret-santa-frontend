import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import './header.scss';

const Header = () => {
  const location = useLocation().pathname;
  let NavLinks = (
    <>
      <NavItem className="header__item">
        <NavLink className="header__link" to={'/login'}>
          Sign in
        </NavLink>
      </NavItem>
      <NavItem className="header__item">
        <NavLink className="header__link" to={'/signup'}>
          Sign up
        </NavLink>
      </NavItem>
    </>
  );

  if (location === '/login') {
    NavLinks = (
      <NavItem className="header__item">
        <NavLink className="header__link" to={'/signup'}>
          Sign up
        </NavLink>
      </NavItem>
    );
  } else if (location === '/signup') {
    NavLinks = (
      <NavItem className="header__item">
        <NavLink className="header__link" to={'/login'}>
          Sign in
        </NavLink>
      </NavItem>
    );
  }

  return (
    <header className="header">
      <Nav>{NavLinks}</Nav>
    </header>
  );
};

export default Header;
