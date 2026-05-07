import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 py-16">
      <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
        Welcome to <span className="text-primary">Vector</span>
      </h1>
      <p className="text-lg md:text-xl text-muted max-w-2xl">
        A clean, modern space for ideas, stories, and connections.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
          href="/blog"
          className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          Read the Blog
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:border-primary hover:text-primary transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
