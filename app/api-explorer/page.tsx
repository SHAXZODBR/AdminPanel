import ApiExplorer from "@/components/api-explorer"

export const metadata = {
  title: "UZFK API Explorer",
  description: "Explore and test all available API endpoints from uzfk.uz",
}

export default function ApiExplorerPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">UZFK API Explorer</h1>
        <ApiExplorer />
      </div>
    </main>
  )
}
