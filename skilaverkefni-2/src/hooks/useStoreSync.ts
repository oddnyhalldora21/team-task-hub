import { useEffect, useRef } from 'react'
import { z } from 'zod'
import { useAppStore } from '@/store/useAppStore'
import type { Project, Task } from '@/types'

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
})

const taskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  completed: z.boolean(),
  createdAt: z.string(),
})

function loadFromStorage<T>(key: string, schema: z.ZodType<T>): T[] {
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return []
    const parsed = z.array(schema).safeParse(JSON.parse(stored))
    return parsed.success ? parsed.data : []
  } catch {
    return []
  }
}

export function useStoreSync() {
  const { projects, tasks } = useAppStore()
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const savedProjects = loadFromStorage<Project>('projects', projectSchema)
    const savedTasks = loadFromStorage<Task>('tasks', taskSchema)
    if (savedProjects.length > 0 || savedTasks.length > 0) {
      useAppStore.setState({ projects: savedProjects, tasks: savedTasks })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
}