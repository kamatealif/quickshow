import { NextResponse } from "next/server"

const TMDB_BASE = "https://api.themoviedb.org/3"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const movieId = searchParams.get("movieId")

  if (!movieId) {
    return NextResponse.json({ key: null })
  }

  const res = await fetch(
    `${TMDB_BASE}/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}`
  )

  const data = await res.json()

  const trailer = data.results?.find(
    (v: any) =>
      v.site === "YouTube" &&
      v.type === "Trailer" &&
      v.official
  ) || data.results?.find(
    (v: any) => v.site === "YouTube"
  )

  return NextResponse.json({
    key: trailer?.key ?? null,
  })
}
