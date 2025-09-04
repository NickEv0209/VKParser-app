import UserList from '../components/User/UserList'
import { Button } from "@mui/material";

import './styles/UserPage.css'
import { useDispatch } from 'react-redux';
import { UsersActionTypes } from '../redux/reducers/userReducer';
import { useTypedSelector } from '../hooks/useTypedSelector';

const UserPage = () => {
  const dispatch = useDispatch()

  const activeExpand = () => {
    dispatch({ type: UsersActionTypes.EXPAND_ACTIVE_ALL })
  }
  const closeExpand = () => {
    dispatch({ type: UsersActionTypes.EXPAND_CLOSE_ALL })
  }

  const {isActive, users} = useTypedSelector((state) => state.users)
  return (
    <div className="user-page">
      <div className="user-page__title-block">
        <h1 className="user-page__title">Список пользователей</h1>
        {isActive || users.some(user => user.isActive)
          ? <Button style={{ color: 'var(--main-color)' }} onClick={closeExpand}>Свернуть все</Button>
          : <Button style={{ color: 'var(--main-color)' }} onClick={activeExpand}>Развернуть все</Button>}
      </div>
      <UserList />
    </div>
  )
}

export default UserPage
