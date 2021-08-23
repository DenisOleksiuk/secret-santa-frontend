import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Label, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { selectInvite } from '../../store/invitedDataSlice';
import apiHelper from '../../services/authHelper';
import './UserProfile.scss';
import { selectUser } from '../../store/authSlice';

const UserProfile = () => {
  const { userName, wishesOfFriends } = useSelector(selectInvite);
  const { register, handleSubmit } = useForm();
  const { user } = useSelector(selectUser);

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
    if (!data.wishes) {
      data.wishes = '-';
    }
    await apiHelper.post('/users/wish', data);
  };

  const renderWishList = () => {
    return wishesOfFriends.map(({ wishes, name }) => {
      wishes.join().replaceAll(',', '').replaceAll(' ', ', ');
      return (
        <div key={name}>
          <span>{name} wants</span>
          <ul>
            {wishes.length ? (
              wishes.map((wish) => (
                <li key={wish} className="wish__li">
                  {wish.replaceAll(',', '').replaceAll(' ', ', ')}
                </li>
              ))
            ) : (
              <li className="wish__li">-</li>
            )}
          </ul>
        </div>
      );
    });
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
          <Input type="text" name="wishes" {...register('wishes')} />
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
