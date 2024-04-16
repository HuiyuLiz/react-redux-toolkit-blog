import { type Post } from '@/features/posts/postsSlice'
import { request } from '@/lib/request'

export async function getPosts(): Promise<Post[]> {
  return (await request({
    url: '/posts',
    method: 'get'
  })) as Post[]
}

export async function createPost({
  title,
  body,
  userId
}: {
  title: string
  body: string
  userId: string
}): Promise<Post> {
  return (await request({
    url: '/posts',
    method: 'post',
    data: { title, body, userId }
  })) as Post
}
