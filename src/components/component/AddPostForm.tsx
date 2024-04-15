import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { postAdded } from '@/features/posts/postsSlice'
import { selectAllUsers } from '@/features/users/usersSlice'

export default function AddPostForm() {
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [userId, setUserId] = useState('')
  const [content, setContent] = useState('')

  const resetForm = () => {
    setTitle('')
    setUserId('')
    setContent('')
  }
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(postAdded(title, content, userId))
    resetForm()
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="space-y-2">
        <Label className="text-xl" htmlFor="select">
          Select Option
        </Label>
        <Select value={userId} onValueChange={setUserId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users.map(user => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-xl" htmlFor="title">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Enter the title"
          value={title}
          onChange={e => {
            setTitle(e.target.value)
          }}
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xl" htmlFor="content">
          Content
        </Label>
        <Textarea
          className="min-h-[150px]"
          id="content"
          placeholder="Enter the content"
          value={content}
          onChange={e => {
            setContent(e.target.value)
          }}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
