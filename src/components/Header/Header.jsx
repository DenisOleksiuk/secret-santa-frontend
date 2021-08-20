import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import './header.scss';

const Header = () => {
  const location = useLocation().pathname;
  const signupLink = (
    <NavItem className="header__item">
      <NavLink className="header__link" to={'/signup'}>
        Sign up
      </NavLink>
    </NavItem>
  );
  const loginLink = (
    <NavItem className="header__item">
      <NavLink className="header__link" to={'/login'}>
        Sign in
      </NavLink>
    </NavItem>
  );

  if (location === '/login') {
    return (
      <header className="header">
        <Nav>{signupLink}</Nav>
      </header>
    );
  } else if (location === '/signup') {
    return (
      <header className="header">
        <Nav>{loginLink}</Nav>
      </header>
    );
  }

  return (
    <header className="header">
      <Nav>
        {signupLink}
        {loginLink}
      </Nav>
    </header>
  );
};

export default Header;
