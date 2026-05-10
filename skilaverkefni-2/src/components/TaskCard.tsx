import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import type { Task } from '@/types'

interface Props {
  task: Task
  onEdit: (task: Task) => void
}

const priorityColors: Record<Task['priority'], string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
}

const statusColors: Record<Task['status'], string> = {
  'todo': 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  'done': 'bg-green-100 text-green-700',
}

export function TaskCard({ task, onEdit }: Props) {
  const { deleteTask, toggleTaskComplete } = useAppStore()

  return (
    <div className={`border rounded-lg p-4 flex flex-col gap-2 ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskComplete(task.id)}
            className="mt-1 cursor-pointer"
          />
          <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </p>
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => onEdit(task)}>Edit</Button>
          <Button size="sm" variant="outline" onClick={() => deleteTask(task.id)} className="text-red-500">Delete</Button>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-gray-500 ml-6">{task.description}</p>
      )}
      <div className="flex gap-2 ml-6">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
    </div>
  )
}