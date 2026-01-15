import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-10
        flex flex-col md:flex-row items-center justify-between gap-4">

        <span className="text-sm text-gray-500">
          © {new Date().getFullYear()} CineBook. All rights reserved.
        </span>

        <div className="flex gap-6 text-sm">
          <Link href="/about" className="text-gray-400 hover:text-white">
            About
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
