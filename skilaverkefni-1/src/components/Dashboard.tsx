import { useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function Dashboard() {
  const projects = useAppStore((s) => s.projects)
  const tasks = useAppStore((s) => s.tasks)

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    const todo = tasks.filter((t) => t.status === 'todo').length
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length
    const done = tasks.filter((t) => t.status === 'done').length
    const high = tasks.filter((t) => t.priority === 'high').length
    const medium = tasks.filter((t) => t.priority === 'medium').length
    const low = tasks.filter((t) => t.priority === 'low').length
    return { total, completed, todo, inProgress, done, high, medium, low }
  }, [tasks])

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Projects</p>
          <p className="text-3xl font-bold mt-1">{projects.length}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-3xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-3xl font-bold mt-1 text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-3xl font-bold mt-1 text-blue-600">{stats.inProgress}</p>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 mb-4">
        <p className="font-medium mb-3">By Status</p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">To Do</span>
            <span className="font-medium">{stats.todo}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">In Progress</span>
            <span className="font-medium">{stats.inProgress}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Done</span>
            <span className="font-medium">{stats.done}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <p className="font-medium mb-3">By Priority</p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-red-500">High</span>
            <span className="font-medium">{stats.high}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-yellow-500">Medium</span>
            <span className="font-medium">{stats.medium}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-green-500">Low</span>
            <span className="font-medium">{stats.low}</span>
          </div>
        </div>
      </div>
    </div>
  )
}