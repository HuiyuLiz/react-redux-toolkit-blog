import { useDispatch } from 'react-redux'

import { Button } from '@/components/ui/button'
import { reactionAdded } from '@/features/posts/postsSlice'

import { type Post } from './postsSlice'

interface ReactionButtonsProps {
  post: Post
}

const reactionEmoji: Record<string, string> = {
  thumbsUp: '👍',
  heart: '❤️'
}

export default function ReactionButtons({ post }: ReactionButtonsProps) {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        key={name}
        variant={'ghost'}
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name as keyof typeof post.reactions]}
      </Button>
    )
  })

  return (
    <div className="flex cursor-pointer flex-row space-x-4 ">
      {reactionButtons}
    </div>
  )
}
