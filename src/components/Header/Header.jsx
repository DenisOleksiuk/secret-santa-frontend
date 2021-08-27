import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem } from 'reactstrap';
import { selectUser, setUser } from '../../store/authSlice';

import './header.scss';

const Header = () => {
  const location = useLocation().pathname;
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(setUser(null));
    window.localStorage.setItem('userData', null);
    history.push('/login');
  };

  const signup = (
    <NavItem className="header__item">
      <NavLink className="header__link" to={'/signup'}>
        Sign up
      </NavLink>
    </NavItem>
  );
  const login = (
    <NavItem className="header__item">
      <NavLink className="header__link" to={'/login'}>
        Sign in
      </NavLink>
    </NavItem>
  );

  const logout = (
    <NavItem className="header__item">
      <NavLink className="header__link" to={'/login'} onClick={logoutHandler}>
        Log out
      </NavLink>
    </NavItem>
  );

  if (location === '/login') {
    return (
      <header className="header">
        <Nav>{signup}</Nav>
      </header>
    );
  } else if (location === '/signup') {
    return (
      <header className="header">
        <Nav>{login}</Nav>
      </header>
    );
  }

  return (
    <header className="header">
      <Nav>{user ? logout : login}</Nav>
    </header>
  );
};

export default Header;
