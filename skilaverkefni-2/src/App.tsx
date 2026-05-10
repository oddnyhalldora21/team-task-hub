import { useState } from 'react'
import { useStoreSync } from '@/hooks/useStoreSync'
import { ProjectList } from '@/components/ProjectList'
import { ProjectForm } from '@/components/ProjectForm'
import { TaskList } from '@/components/TaskList'
import { Dashboard } from '@/components/Dashboard'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Project } from '@/types'

function App() {
  useStoreSync()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [view, setView] = useState<'projects' | 'dashboard'>('projects')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Task Hub</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView('projects')}
            className={`px-4 py-2 rounded text-sm font-medium ${view === 'projects' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setView('dashboard')}
            className={`px-4 py-2 rounded text-sm font-medium ${view === 'dashboard' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Dashboard
          </button>
        </div>
      </header>

      {view === 'dashboard' ? (
        <Dashboard />
      ) : (
        <div className="flex gap-6 p-6">
          <aside className="w-72 bg-white rounded-lg border p-4">
            <ProjectList
              onSelectProject={setSelectedProject}
              selectedProjectId={selectedProject?.id ?? null}
              onNewProject={() => setShowProjectForm(true)}
            />
          </aside>
          <main className="flex-1 bg-white rounded-lg border p-4">
            {selectedProject ? (
              <TaskList projectId={selectedProject.id} projectName={selectedProject.name} />
            ) : (
              <p className="text-gray-500">Select a project to see its tasks.</p>
            )}
          </main>
        </div>
      )}

      <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>
          <ProjectForm onClose={() => setShowProjectForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App