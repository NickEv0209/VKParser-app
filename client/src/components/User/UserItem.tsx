import { useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { UserProps } from "./UserList";
import UserProductList from "./UserProductList";

import { UsersActionTypes } from "../../redux/reducers/userReducer";

const UserItem = ({ user }: UserProps) => {
  const dispatch = useDispatch()
  const expandUserHandler = () => {
    dispatch({ type: UsersActionTypes.EXPAND_ACTIVE_USER, payload: user })
  }
  return (
    <>
      <div className={user.isActive ? 'user user--active' : 'user'}  onDoubleClick={expandUserHandler}>
        <div className="user__info">
          <img src={user.avatar} className="user__avatar"/>
          <h2 className="user__name">{user.name}</h2>
        </div>
        <div className="user__buttons">
          <Tooltip title='Перейти в сообщения' placement="top" arrow>
            <a target="_blank" href={user.link} style={{textDecoration: 'none'}}>
              <IconButton>
                <EmailIcon />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip title={user.isActive ? 'Свернуть' : 'Развернуть'} placement="top" arrow>
            <IconButton onClick={expandUserHandler}>
              <ExpandMoreIcon style={user.isActive ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)'}}/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {user.isActive && <UserProductList products={user.products}/>}
    </>
  );
};

export default UserItem;
