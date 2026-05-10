import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import type { Project } from '@/types'

interface Props {
  onSelectProject: (project: Project) => void
  selectedProjectId: string | null
  onNewProject: () => void
}

export function ProjectList({ onSelectProject, selectedProjectId, onNewProject }: Props) {
  const { projects, deleteProject } = useAppStore()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button size="sm" onClick={onNewProject}>+ New</Button>
      </div>
      {projects.length === 0 && (
        <p className="text-sm text-gray-500">No projects yet. Create one!</p>
      )}
      {projects.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelectProject(p)}
          className={`p-3 rounded border cursor-pointer hover:bg-gray-50 ${
            selectedProjectId === p.id ? 'border-blue-500 bg-blue-50' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <p className="font-medium">{p.name}</p>
            <button
              onClick={(e) => { e.stopPropagation(); deleteProject(p.id) }}
              className="text-red-400 hover:text-red-600 text-sm"
            >
              ✕
            </button>
          </div>
          {p.description && (
            <p className="text-sm text-gray-500 mt-1">{p.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}