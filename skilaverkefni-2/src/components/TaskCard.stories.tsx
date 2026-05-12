import type { Meta, StoryObj } from '@storybook/react'
import { TaskCard } from './TaskCard'

const meta: Meta<typeof TaskCard> = {
  title: 'Components/TaskCard',
  component: TaskCard,
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof TaskCard>

const baseTask = {
  id: '1',
  projectId: 'p1',
  description: '',
  createdAt: new Date().toISOString(),
}

export const TodoHighPriority: Story = {
  args: {
    task: {
      ...baseTask,
      title: 'Fix login bug',
      status: 'todo',
      priority: 'high',
      completed: false,
    },
    onEdit: () => {},
  },
}

export const InProgressMediumPriority: Story = {
  args: {
    task: {
      ...baseTask,
      title: 'Write documentation',
      status: 'in-progress',
      priority: 'medium',
      completed: false,
    },
    onEdit: () => {},
  },
}

export const Completed: Story = {
  args: {
    task: {
      ...baseTask,
      title: 'Deploy to production',
      status: 'done',
      priority: 'low',
      completed: true,
    },
    onEdit: () => {},
  },
}

export const WithDescription: Story = {
  args: {
    task: {
      ...baseTask,
      title: 'Refactor auth module',
      description: 'Clean up the token refresh logic and add error handling',
      status: 'in-progress',
      priority: 'high',
      completed: false,
    },
    onEdit: () => {},
  },
}