import { NextResponse } from "next/server"
import mockUsers from "@/lib/mock/users"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get("language") || "uz"

  try {
    // Try to fetch from the real API
    const response = await fetch(`https://uzfk.uz/${language}/api/users/`, {
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
    console.error("Error fetching users data from API:", error)

    // Return mock data as fallback
    return NextResponse.json({
      results: mockUsers,
      count: mockUsers.length,
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
