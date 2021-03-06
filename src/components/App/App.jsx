import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, fetchCurrentUserAsync } from '../../store/authSlice';
import Header from '../Header/Header';
import Login from '../../pages/Login/Login';
import Signup from '../../pages/Signup/Signup';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Invite from '../../pages/Invite/Invite';
import UserProfile from '../../pages/UserProfile/UserProfile';
import Spinner from '../Spinner/Spinner';

import './App.scss';

const App = () => {
  const { isLoading, error, user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const isToken = window.localStorage.getItem('userData');

  useEffect(() => {
    dispatch(fetchCurrentUserAsync());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/">
            {isToken && !error ? (
              <Redirect to={user?.friendsFormWasSubmitted ? '/profile' : '/dashboard'} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/invite">
            <Invite />
          </Route>
          <Route exact path="/profile">
            <UserProfile />
          </Route>
          <Route
            render={() => (
              <h1 className="error__route">We can't find this url address</h1>
            )}
          />
        </Switch>
      </Container>
    </>
  );
};

export default App;
