import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-foreground mb-2">Blog</h1>
      <p className="text-muted mb-10">Thoughts on code, design, and building things.</p>

      <div className="flex flex-col gap-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-6 rounded-xl border border-border bg-subtle hover:border-primary transition-all duration-200"
          >
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <time className="text-sm text-muted">{formatDate(post.date)}</time>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-background border border-border text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-muted text-sm leading-relaxed">{post.description}</p>
            <span className="inline-block mt-4 text-sm font-medium text-primary">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
