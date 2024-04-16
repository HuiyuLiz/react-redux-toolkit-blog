import { type User } from '@/features/users/usersSlice'
import { request } from '@/lib/request'

export async function getUsers(): Promise<User[]> {
  return (await request({
    url: '/users',
    method: 'get'
  })) as User[]
}
