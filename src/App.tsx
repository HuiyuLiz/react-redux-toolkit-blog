import { PostList } from '@/features/posts/PostList'

import Header from './components/shared/Header'

const App = () => {
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
