import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddPostForm from '@/components/component/AddPostForm'
import { type AppDispatch } from '@/store'

import { fetchUsers } from '../users/usersSlice'
import PostContent from './PostContent'
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts
} from './postsSlice'

export function PostList() {
  const dispatch = useDispatch<AppDispatch>()

  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const postError = useSelector(getPostsError)

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  let content

  if (postStatus === 'pending') {
    content = <p>Loading...</p>
  } else if (postStatus === 'succeeded') {
    content = posts.map(post => (
      <PostContent key={post.id} post={post}></PostContent>
    ))
  } else if (postStatus === 'failed') {
    content = <p>{postError}</p>
  }

  useEffect(() => {
    scrollToBottom()
  }, [posts.length])

  useEffect(() => {
    if (postStatus === 'idle') {
      void dispatch(fetchPosts())
      void dispatch(fetchUsers())
    }
  }, [postStatus, dispatch])

  return (
    <div className="container grid gap-6 px-4 md:grid-cols-2 md:px-6 lg:gap-12">
      <div className="scrollbar h-[50rem] space-y-4 overflow-y-auto pr-8">
        {content}
        <div ref={messagesEndRef} />
      </div>
      <AddPostForm></AddPostForm>
    </div>
  )
}
