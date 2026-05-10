import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { projectSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ProjectForm({ onClose }: { onClose: () => void }) {
  const addProject = useAppStore((s) => s.addProject)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({})

  const handleSubmit = () => {
    const result = projectSchema.safeParse({ name, description })
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name?.[0],
        description: fieldErrors.description?.[0],
      })
      return
    }
    addProject({
      id: crypto.randomUUID(),
      name: result.data.name,
      description: result.data.description ?? '',
      createdAt: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="My awesome project"
          className="mt-2"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this project about?"
          className="mt-2"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!name.trim()} className={name.trim() ? 'border-2 border-black' : ''}>Create Project</Button>
      </div>
    </div>
  )
}