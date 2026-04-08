import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  description: z.string().max(200).optional(),
})

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
})

export type ProjectFormData = z.infer<typeof projectSchema>
export type TaskFormData = z.infer<typeof taskSchema>