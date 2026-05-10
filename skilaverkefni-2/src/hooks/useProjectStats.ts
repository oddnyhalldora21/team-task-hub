import { useMemo } from 'react'
import type { Project, Task } from '@/types'

export function useProjectStats(projects: Project[], tasks: Task[]) {
  return useMemo(() => {
    return projects.map((p) => {
      const projectTasks = tasks.filter((t) => t.projectId === p.id)
      const total = projectTasks.length
      const completed = projectTasks.filter((t) => t.completed).length
      const completion = total === 0 ? 0 : Math.round((completed / total) * 100)
      return {
        project: p,
        total,
        completed,
        completion,
      }
    })
  }, [projects, tasks])
}