export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'in-progress' | 'done'

export interface Project {
  id: string
  name: string
  description: string
  createdAt: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: Status
  priority: Priority
  completed: boolean
  createdAt: string
}