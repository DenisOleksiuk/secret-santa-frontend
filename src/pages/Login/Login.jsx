import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Label, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authHelper from '../../services/authHelper';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';

import './login.scss';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required field'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('No password provided.'),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const user = await authHelper.post('/users/login', data);
      dispatch(setUser(user.data.user));
      window.localStorage.setItem('userData', user.data.token);
      window.location.href = process.env.REACT_APP_URL;
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <FormGroup>
            <Label className="form__label">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder={'Enter your email'}
              {...register('email')}
            />
            <p>{errors.email?.message}</p>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label className="form__label">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder={'Enter your password'}
              {...register('password')}
            />
            <p>{errors.password?.message}</p>
          </FormGroup>
        </Col>
      </Row>
      <p>{error}</p>

      <Button className="w-25" color="primary">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
