import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useTaskFilters } from '@/hooks/useTaskFilters'
import { TaskCard } from '@/components/TaskCard'
import { TaskForm } from '@/components/TaskForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Task } from '@/types'

interface Props {
  projectId: string
  projectName: string
}

export function TaskList({ projectId, projectName }: Props) {
  const allTasks = useAppStore((s) => s.tasks)
  const tasks = useMemo(() => allTasks.filter((t) => t.projectId === projectId), [allTasks, projectId])
  const { search, setSearch, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, filtered } = useTaskFilters(tasks)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{projectName}</h2>
        <Button size="sm" onClick={() => setShowForm(true)}>+ New Task</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as Task['status'] | 'all')}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="z-[200]">
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as Task['priority'] | 'all')}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="z-[200]">
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-sm">No tasks found.</p>
      )}

      <div className="flex flex-col gap-3">
        {filtered.map((t) => (
          <TaskCard key={t.id} task={t} onEdit={handleEdit} />
        ))}
      </div>

      <Dialog open={showForm} onOpenChange={(open) => { if (!open) handleClose() }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'New Task'}</DialogTitle>
          </DialogHeader>
          <TaskForm
            projectId={projectId}
            onClose={handleClose}
            existingTask={editingTask ?? undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}