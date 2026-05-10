import { describe, it, expect } from 'vitest'
import { projectSchema, taskSchema } from '@/lib/schemas'

describe('projectSchema', () => {
  it('accepts a valid project', () => {
    const result = projectSchema.safeParse({ name: 'My Project' })
    expect(result.success).toBe(true)
  })

  it('rejects an empty name', () => {
    const result = projectSchema.safeParse({ name: '' })
    expect(result.success).toBe(false)
  })

  it('rejects a name over 50 characters', () => {
    const result = projectSchema.safeParse({ name: 'a'.repeat(51) })
    expect(result.success).toBe(false)
  })

  it('accepts an optional description', () => {
    const result = projectSchema.safeParse({ name: 'My Project', description: 'Hello' })
    expect(result.success).toBe(true)
  })
})

describe('taskSchema', () => {
  it('accepts a valid task', () => {
    const result = taskSchema.safeParse({
      title: 'Fix bug',
      status: 'todo',
      priority: 'high',
    })
    expect(result.success).toBe(true)
  })

  it('rejects an empty title', () => {
    const result = taskSchema.safeParse({
      title: '',
      status: 'todo',
      priority: 'high',
    })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid status', () => {
    const result = taskSchema.safeParse({
      title: 'Fix bug',
      status: 'banana',
      priority: 'high',
    })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid priority', () => {
    const result = taskSchema.safeParse({
      title: 'Fix bug',
      status: 'todo',
      priority: 'urgent',
    })
    expect(result.success).toBe(false)
  })
})