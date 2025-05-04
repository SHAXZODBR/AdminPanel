import ApiExplorer from "@/components/api-explorer"

export const metadata = {
  title: "API Explorer Dashboard",
  description: "Admin dashboard for exploring and testing all available API endpoints",
}

export default function ApiExplorerDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">API Explorer Dashboard</h1>
        <p className="text-gray-500 mb-8">Test and explore all available API endpoints in one place</p>
        <ApiExplorer />
      </div>
    </main>
  )
}
