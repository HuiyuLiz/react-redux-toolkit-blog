import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, nanoid } from '@reduxjs/toolkit'

export interface Post {
  id: string
  userId: string
  title: string
  content: string
  reactions: {
    thumbsUp: number
    heart: number
  }
}

export interface PostsState {
  data: Post[]
}

const initialState: PostsState = {
  data: [
    {
      id: '1',
      userId: '1',
      title: 'Redux Toolkit',
      content:
        'Redux Toolkit provides utilities for simplifying common Redux tasks, including creating slice reducers, async thunks, and immutable update logic.',
      reactions: {
        thumbsUp: 0,
        heart: 0
      }
    },
    {
      id: '2',
      userId: '2',
      title: 'React.js',
      content:
        'React.js is a JavaScript library for building user interfaces. It lets you create reusable components that efficiently update based on data changes.',
      reactions: {
        thumbsUp: 0,
        heart: 0
      }
    }
  ]
}
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.data.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        const id = nanoid()
        return {
          payload: {
            id,
            title,
            content,
            userId,
            reactions: {
              thumbsUp: 0,
              heart: 0
            }
          }
        }
      }
    },
    reactionAdded: (
      state,
      action: PayloadAction<{ postId: string; reaction: string }>
    ) => {
      const { postId, reaction } = action.payload
      const existingPost = state.data.find(post => post.id === postId)
      if (existingPost != null) {
        existingPost.reactions[
          reaction as keyof typeof existingPost.reactions
        ]++
      }
    }
  }
})

export const selectAllPosts = (state: { posts: PostsState }) => state.posts.data

// Action creators are generated for each case reducer function
export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
