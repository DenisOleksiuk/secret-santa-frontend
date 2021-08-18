import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Plus } from 'react-feather';
import { useForm } from 'react-hook-form';
import authHelper from '../../services/authHelper';
import './dashboard.scss';

function Dashboard() {
  const { register, handleSubmit } = useForm();
  const [forms, setForms] = useState([{ email: 'Email', name: 'Name', id: 0 }]);

  const onSubmit = async (data) => {
    console.log(data);
    const user = await authHelper.post('/users/send', data);
    console.log(user);
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
          {...register(`email-${item.id}`, { required: true })}
        />
        <Label className="form__label">{item.name}</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter your friend's name"
          {...register(`name-${item.id}`, { required: true })}
        />
      </FormGroup>
    ));
  };

  return (
    <>
      <Plus className="add-form" size={48} color="white" onClick={addFormGroup} />
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="forms-wrapper">{renderItems()}</div>
        <Button className="w-25" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Dashboard;
