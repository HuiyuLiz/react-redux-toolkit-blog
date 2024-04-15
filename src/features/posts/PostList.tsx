import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import AddPostForm from '@/components/component/AddPostForm'

import PostContent from './PostContent'
import { selectAllPosts } from './postsSlice'

export function PostList() {
  const posts = useSelector(selectAllPosts)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const renderPosts = posts.map(post => (
    <PostContent key={post.id} post={post}></PostContent>
  ))

  useEffect(() => {
    scrollToBottom()
  }, [posts])

  return (
    <div className="container grid gap-6 px-4 md:grid-cols-2 md:px-6 lg:gap-12">
      <div className="scrollbar h-[50rem] space-y-4 overflow-y-auto pr-8">
        {renderPosts}
        <div ref={messagesEndRef} />
      </div>
      <AddPostForm></AddPostForm>
    </div>
  )
}
