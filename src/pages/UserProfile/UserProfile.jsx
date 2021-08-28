import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Label, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Plus, X } from 'react-feather';
import apiHelper from '../../services/authHelper';
import { selectUser, setUser } from '../../store/authSlice';
import Spinner from '../../components/Spinner/Spinner';

import './UserProfile.scss';

const UserProfile = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [receiverWishes, setReceiverWishes] = useState([]);
  const [receiverError, setReceiverError] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiHelper.get(`/users/receiver/${user.receiver.email}`).then(({ data }) => {
      setReceiverWishes(data);
    });
  }, [user.receiver.email]);

  const onSubmit = async (data, e) => {
    data.user = user;
    data.wish = data.wish?.trim();
    if (!data.wish) return;

    try {
      e.target.reset();
      reset();
      setLoading(true);
      const newUser = await apiHelper.post('/users/add/wish', data);
      setLoading(false);
      dispatch(setUser(newUser.data));
      setReceiverError(null);
    } catch (error) {
      setReceiverError('The number of desires has reached its maximum');
    }
  };

  const deleteWish = async (id) => {
    setLoading(true);
    const newUser = await apiHelper.post(`/users/delete/wish/${id}`, user);
    setLoading(false);
    dispatch(setUser(newUser.data));
  };

  const renderWishList = (wishlist, owner = false) => {
    return (
      <div>
        <span>{owner ? 'You want' : `${user.receiver.name} wants`}</span>
        <ul>
          {wishlist.length ? (
            wishlist.map((wish) => {
              return (
                <li key={wish._id} className="wish__li">
                  {wish.wish}
                  {owner ? (
                    <X
                      className="userProfile__close"
                      onClick={() => deleteWish(wish._id)}
                    />
                  ) : null}
                </li>
              );
            })
          ) : (
            <li className="wish__li">-</li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="userProfile">
      <h1 style={{ color: 'wheat' }}>Hi {user.name}</h1>
      <div className="secret-message">
        You are secret santa for <span className="secret-name">{user.receiver.name}</span>
      </div>
      <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
        <Label className="userProfile__label">Write down your wishes</Label>
        <InputGroup>
          <Input type="text" name="wish" {...register('wish', { required: 'true' })} />
          <InputGroupAddon addonType="append">
            <Button color="primary" type="submit">
              <Plus />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <p>{receiverError}</p>
      </Form>
      <div className="owner__wish-list">
        {loading ? <Spinner /> : renderWishList(user.wishes, true)}
      </div>
      <div className="wish__list">{renderWishList(receiverWishes)}</div>
    </div>
  );
};

export default UserProfile;
