import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold text-foreground">Page not found</h2>
      <p className="text-muted max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
      >
        Back to Home
      </Link>
    </section>
  );
}
