import { PostList } from '@/features/posts/PostList'

import Header from './components/shared/Header'

const App = () => {
  return (
    <main className="relative flex min-h-screen justify-center">
      <Header></Header>
      <section className="mt-20">
        <PostList></PostList>
      </section>
    </main>
  )
}

export default App
