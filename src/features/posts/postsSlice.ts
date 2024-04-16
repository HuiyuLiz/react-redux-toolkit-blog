import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

import { createPost, getPosts } from '@/api/posts'

export interface Post {
  id: string
  userId: number
  title: string
  body: string
  reactions: {
    thumbsUp: number
    heart: number
  }
}

export interface PostsState {
  data: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | undefined
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getPosts()
  return response
})

export const addNewPost = createAsyncThunk(
  'posts/createPost',
  async ({
    title,
    body,
    userId
  }: {
    title: string
    body: string
    userId: string
  }) => {
    const response = await createPost({ title, body, userId })
    return response
  }
)

const initialState: PostsState = {
  data: [],
  status: 'idle',
  error: ''
} satisfies PostsState

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.data.push(action.payload)
      },
      prepare: (title: string, body: string, userId: number) => {
        const id = nanoid()
        return {
          payload: {
            id,
            title,
            body,
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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadedPosts = action.payload.map(post => {
          post.reactions = {
            thumbsUp: Math.floor(Math.random() * 100),
            heart: Math.floor(Math.random() * 100)
          }
          return post
        })
        state.data = loadedPosts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId)
        action.payload.reactions = {
          thumbsUp: 0,
          heart: 0
        }
        state.data.push(action.payload)
      })
  }
})

export const selectAllPosts = (state: { posts: PostsState }) => state.posts.data
export const getPostsStatus = (state: { posts: PostsState }) =>
  state.posts.status
export const getPostsError = (state: { posts: PostsState }) => state.posts.error

// Action creators are generated for each case reducer function
export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
