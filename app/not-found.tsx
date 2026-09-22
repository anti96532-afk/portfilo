import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05070b] px-6 text-center text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">404</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.06em]">Page not found</h1>
        <p className="mt-4 text-white/65">This link seems to have wandered off.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070b13]">
          Back to home
        </Link>
      </div>
    </main>
  );
}
