import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaskFilters } from '@/hooks/useTaskFilters'
import type { Task } from '@/types'

const mockTasks: Task[] = [
  {
    id: '1',
    projectId: 'p1',
    title: 'Fix login bug',
    status: 'todo',
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    projectId: 'p1',
    title: 'Write documentation',
    status: 'in-progress',
    priority: 'low',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    projectId: 'p1',
    title: 'Deploy to production',
    status: 'done',
    priority: 'high',
    completed: true,
    createdAt: new Date().toISOString(),
  },
]

describe('useTaskFilters', () => {
  it('returns all tasks when no filters are set', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks))
    expect(result.current.filtered).toHaveLength(3)
  })

  it('filters by search term', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks))
    act(() => {
      result.current.setSearch('login')
    })
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].title).toBe('Fix login bug')
  })

  it('filters by status', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks))
    act(() => {
      result.current.setStatusFilter('done')
    })
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].title).toBe('Deploy to production')
  })

  it('filters by priority', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks))
    act(() => {
      result.current.setPriorityFilter('high')
    })
    expect(result.current.filtered).toHaveLength(2)
  })

  it('search is case insensitive', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks))
    act(() => {
      result.current.setSearch('LOGIN')
    })
    expect(result.current.filtered).toHaveLength(1)
  })
})