import { NextResponse } from "next/server"
import mockLeadership from "@/lib/mock/leadership"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get("language") || "uz"

  try {
    // Try to fetch from the real API
    const response = await fetch(`http://uzfk.uz/${language}/api/leadership/`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching leadership data from API:", error)

    // Return mock data as fallback
    const filteredMockData = mockLeadership.filter((leader) => leader.language === language || !leader.language)

    return NextResponse.json({
      results: filteredMockData,
      count: filteredMockData.length,
      next: null,
      previous: null,
      is_mock_data: true,
    })
  }
}

export async function POST(request: Request) {
  // Handle POST requests (create)
  return NextResponse.json({ message: "Create operation not implemented in mock mode" }, { status: 501 })
}
