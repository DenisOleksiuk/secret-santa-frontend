import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Plus } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { X } from 'react-feather';
import { useHistory } from 'react-router-dom';
import authHelper from '../../services/authHelper';
import { selectUser, setUser } from '../../store/authSlice';

import './dashboard.scss';

function Dashboard() {
  const { register, handleSubmit, unregister } = useForm();
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [forms, setForms] = useState([{ email: 'Email', name: 'Name', id: 0 }]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const ConvertObjectToArray = (obj) => {
    const arrayOfFriends = [];
    Object.values(obj).forEach((_, i) => {
      if (obj[`email-${i}`]) {
        arrayOfFriends.push({
          email: obj[`email-${i}`],
          name: obj[`name-${i}`],
        });
      }
    });
    return arrayOfFriends;
  };

  const validationForIdenticalMails = (friends) => {
    const emails = friends.map((friend) => friend.email);
    return new Set(emails).size === friends.length;
  };

  const validationForUndefinedOrEmptyStrings = (data) => {
    return Object.values(data).includes(undefined) || Object.values(data).includes('');
  };

  const onSubmit = async (data) => {
    if (validationForUndefinedOrEmptyStrings(data)) {
      return alert('Seems like you have empty fields');
    }

    const arrayOfFriends = ConvertObjectToArray(data);
    arrayOfFriends.push({ ...user, owner: true });

    if (!validationForIdenticalMails(arrayOfFriends)) {
      return alert('Seems like you entered identical emails!');
    }

    setLoading(true);
    try {
      const owner = await authHelper.post('/users/send', arrayOfFriends);
      const changedOwner = await authHelper.patch('/users/send', owner.data);
      dispatch(setUser(changedOwner.data));
      setLoading(false);

      if (owner.status !== 200 && changedOwner.status !== 200) {
        throw new Error('The request was not sent successfully');
      }

      history.push('/profile');
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  const addFormGroup = () => {
    setForms((state) => [
      ...state,
      { email: 'Email', name: 'Name', id: state[state.length - 1].id + 1 },
    ]);
  };

  const deleteFormGroup = (item) => {
    unregister(`email-${item.id}`);
    unregister(`name-${item.id}`);
    setForms((state) => {
      return state.length > 1 ? state.filter((form) => form.id !== item.id) : state;
    });
  };

  const renderItems = () => {
    return forms.map((item) => (
      <FormGroup key={item.id} className="form__group">
        <Label className="form__label">{item.email}</Label>
        <X className="form__group-close" onClick={() => deleteFormGroup(item)} />
        <Input
          type="email"
          name="email"
          placeholder="Enter your friend's email"
          {...register(`email-${item.id}`)}
        />
        <Label className="form__label">{item.name}</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter your friend's name"
          {...register(`name-${item.id}`)}
        />
      </FormGroup>
    ));
  };

  if (loading) {
    return (
      <Alert color="primary" className="form__group-alert">
        Wait a bit for submitting the form!
      </Alert>
    );
  }

  return (
    <>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="forms-wrapper">
          <FormGroup className="form__group">
            <Label className="form__label">Owner email</Label>
            <Input disabled type="email" name="email" placeholder={user?.email} />
            <Label className="form__label">Owner name</Label>
            <Input disabled type="text" name="name" placeholder={user?.name} />
          </FormGroup>
          {renderItems()}
        </div>
        <Plus className="add-form" size={48} color="white" onClick={addFormGroup} />
        <Button className="w-25" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Dashboard;
