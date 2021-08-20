import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Plus } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import authHelper from '../../services/authHelper';
import './dashboard.scss';
import { selectUser } from '../../store/authSlice';

function Dashboard() {
  const { register, handleSubmit } = useForm();
  const { user } = useSelector(selectUser);
  const [forms, setForms] = useState([{ email: 'Email', name: 'Name', id: 0 }]);

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

  const onSubmit = (data) => {
    if (Object.values(data).includes(undefined) || Object.values(data).includes('')) {
      return alert('Seems like you have empty fields');
    }
    console.log(data);
    const arrayOfFriends = ConvertObjectToArray(data);
    const owner = Object.assign({}, user);
    delete owner.age;
    arrayOfFriends.push({ owner });
    authHelper.post('/users/send', arrayOfFriends);
  };

  const addFormGroup = () => {
    setForms((state) => [
      ...state,
      { email: 'Email', name: 'Name', id: state[state.length - 1].id + 1 },
    ]);
  };

  const renderItems = () => {
    return forms.map((item) => (
      <FormGroup key={item.id} className="form__group">
        <Label className="form__label">{item.email}</Label>
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

  return (
    <>
      <Plus className="add-form" size={48} color="white" onClick={addFormGroup} />
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
        <Button className="w-25" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Dashboard;
