import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Label, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { selectInvite } from '../../store/invitedDataSlice';
import apiHelper from '../../services/authHelper';
import './UserProfile.scss';
import { selectUser } from '../../store/authSlice';

const UserProfile = () => {
  const { userName, wishes } = useSelector(selectInvite);
  const { register, handleSubmit } = useForm();
  const { user } = useSelector(selectUser);
  const [inputValue, setInputValue] = useState('');

  if (!userName) {
    return (
      <h1 className="wish-message">
        Oops something went wrong and we can't get a name of your friend
      </h1>
    );
  }

  const onSubmit = async (data) => {
    data.user = user;
    data.wishes = data.wishes?.trim();
    if (!data.wishes) return;
    setInputValue('');
    await apiHelper.post('/users/wish', data);
    alert('Your wishes were sent successfully');
  };
  const renderWishList = () => {
    const wish = wishes.join('');
    return (
      <div>
        <span>{userName} wants</span>
        <ul>
          <li className="wish__li">{wish || '-'}</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="userProfile">
      <h1 style={{ color: 'wheat' }}>Hi {user.name}</h1>
      <div className="secret-message">
        You are secret santa for <span className="secret-name">{userName}</span>
      </div>
      <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
        <Label className="userProfile__label">Write down your wishes</Label>
        <InputGroup>
          <Input
            value={inputValue}
            type="text"
            name="wishes"
            {...register('wishes', { required: 'true' })}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
      <div className="wish__list">{renderWishList()}</div>
    </div>
  );
};

export default UserProfile;
