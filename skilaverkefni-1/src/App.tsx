import { useStoreSync } from '@/hooks/useStoreSync'
import { useAppStore } from '@/store/useAppStore'

function App() {
  useStoreSync()

  const { projects, addProject } = useAppStore()

  const handleAdd = () => {
    addProject({
      id: crypto.randomUUID(),
      name: 'Test Project',
      description: 'A test project',
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Team Task Hub</h1>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Test Project
      </button>
      <ul>
        {projects.map((p) => (
          <li key={p.id} className="border p-3 rounded mb-2">
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-500">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
