import { PostUserName } from './PostUserName'
import ReactionButtons from './ReactionButtons'
import { type Post } from './postsSlice'

interface PostProps {
  post: Post
}

export default function PostContent({ post }: PostProps) {
  return (
    <div className="mb-8 space-y-2">
      <div className="mb-4 space-y-1">
        <h1 className="text-4xl font-bold tracking-tight lg:text-3xl">
          {post.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          <PostUserName userId={post.userId}></PostUserName>
        </p>
      </div>
      <div className="prose prose-gray max-w-none not-italic">
        <p>{post.body}</p>
      </div>
      <div>
        <ReactionButtons post={post}></ReactionButtons>
      </div>
    </div>
  )
}
