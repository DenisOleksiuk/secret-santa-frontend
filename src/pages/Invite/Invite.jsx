import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { inviteAsync } from '../../store/invitedDataSlice';

const style = {
  color: '#fdfdfd',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};

const Invite = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(inviteAsync(data.password));
  };

  return (
    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label className="form__label">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder={'Enter your password'}
          {...register('password', { required: 'This is required field' })}
        />
        <p style={style}>{errors.password?.message}</p>
      </FormGroup>

      <Button className="w-25" color="primary">
        Submit
      </Button>
    </Form>
  );
};

export default Invite;
