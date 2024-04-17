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
import { addNewPost } from '@/features/posts/postsSlice'
import { selectAllUsers } from '@/features/users/usersSlice'
import { type AppDispatch } from '@/store'

export default function AddPostForm() {
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch<AppDispatch>()

  const [title, setTitle] = useState('')
  const [userId, setUserId] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const resetForm = () => {
    setTitle('')
    setUserId('')
    setContent('')
  }

  const validateForm =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm) {
      return
    }
    try {
      setAddRequestStatus('pending')
      void dispatch(
        addNewPost({ title, body: content, userId: Number(userId) })
      ).unwrap()
      resetForm()
    } catch (err) {
      console.error('Failed to save the post', err)
    } finally {
      setAddRequestStatus('idle')
      resetForm()
    }
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="space-y-2">
        <Label className="text-xl" htmlFor="select">
          Select Option
        </Label>
        <Select
          value={userId}
          onValueChange={value => {
            setUserId(value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users.map(user => (
              <SelectItem key={user.id} value={JSON.stringify(user.id)}>
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
      <Button disabled={!validateForm} type="submit">
        Submit
      </Button>
    </form>
  )
}
