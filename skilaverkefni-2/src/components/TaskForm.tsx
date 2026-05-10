import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { taskSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Task } from '@/types'

interface Props {
  projectId: string
  onClose: () => void
  existingTask?: Task
}

export function TaskForm({ projectId, onClose, existingTask }: Props) {
  const { addTask, updateTask } = useAppStore()
  const [title, setTitle] = useState(existingTask?.title ?? '')
  const [description, setDescription] = useState(existingTask?.description ?? '')
  const [status, setStatus] = useState(existingTask?.status ?? 'todo')
  const [priority, setPriority] = useState(existingTask?.priority ?? 'medium')
  const [errors, setErrors] = useState<{ title?: string }>({})

  const handleSubmit = () => {
    const result = taskSchema.safeParse({ title, description, status, priority })
    if (!result.success) {
      setErrors({ title: result.error.flatten().fieldErrors.title?.[0] })
      return
    }
    if (existingTask) {
      updateTask(existingTask.id, result.data)
    } else {
      addTask({
        id: crypto.randomUUID(),
        projectId,
        title: result.data.title,
        description: result.data.description ?? '',
        status: result.data.status,
        priority: result.data.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      })
    }
    onClose()
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="mt-2"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Any details?"
          className="mt-2"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as Task['status'])}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[200]">
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label>Priority</Label>
          <Select value={priority} onValueChange={(v) => setPriority(v as Task['priority'])}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[200]">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className={title.trim() ? 'border-2 border-black' : ''}
        >
          {existingTask ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </div>
  )
}