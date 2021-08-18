import React, { useEffect } from 'react';
import { Container, Spinner } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, fetchCurrentUserAsync } from '../../store/authSlice';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Dashboard from '../Dashboard/Dashboard';

const App = () => {
  const { isLoading } = useSelector(selectUser);
  const dispatch = useDispatch();
  const isToken = window.localStorage.getItem('userData');

  useEffect(() => {
    dispatch(fetchCurrentUserAsync());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner color="primary" />;
  }

  return (
    <>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/">
            {isToken ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
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
        </Switch>
      </Container>
    </>
  );
};

export default App;
