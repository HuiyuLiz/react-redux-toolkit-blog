import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { PostList } from '@/features/posts/PostList'
import { type AppDispatch } from '@/store'

import Header from './components/shared/Header'
import { fetchUsers } from './features/users/usersSlice'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    void dispatch(fetchUsers())
  })

  return (
    <main>
      <Header></Header>
      <section className="mt-[calc(_57px+_2rem)]">
        <PostList></PostList>
      </section>
    </main>
  )
}

export default App
