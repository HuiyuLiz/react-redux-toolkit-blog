import { useSelector } from 'react-redux'

import { selectAllUsers } from '../users/usersSlice'

interface PostUserNameProps {
  userId: string
}

export function PostUserName({ userId }: PostUserNameProps) {
  const users = useSelector(selectAllUsers)
  const userName = users.find(user => user.id === userId)

  return <>Posted by {userName != null ? userName.name : 'Unknown User'}</>
}
