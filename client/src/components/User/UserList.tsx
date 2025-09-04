import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { useTypedSelector } from "../../hooks/useTypedSelector"
import { User, UsersActionTypes } from "../../redux/reducers/userReducer"

import UserItem from "./UserItem"

import './User.css'
import LoadingUsersList from "../Loading/LoadingUsers/LoadingUserList"
import NotSearchUsers from "./NotSearchUsers"

export interface UserProps {
  user: User
}

const UserList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: UsersActionTypes.FETCH_USER})
  }, [dispatch])

  
  const { isError, isLoading, users } = useTypedSelector(state => state.users)
  const { query } = useTypedSelector(state => state.search)
  
  console.log(users)

  if(isError) return <h1>Error</h1>
  if(isLoading) return <LoadingUsersList count={10}/>

  const filterByQuery = (users: User[]) => {
    if (!query.trim()) return users;

    return users.filter(user => 
      user.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  };

  const renderUsers = (users: User[]) => (
    <div className="users">
      {users.map((user) => {
        return (
          <UserItem user={user} key={user.id}/>
        )
      })}
    </div>
  )

  const filteredUsers = filterByQuery(users)
  if( filteredUsers.length ) return renderUsers(filteredUsers)
  return <NotSearchUsers />
}

export default UserList
