import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto py-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-8"
      >
        ← Back to Blog
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <time className="text-sm text-muted">{formatDate(post.date)}</time>
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-subtle border border-border text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-foreground">{post.title}</h1>
        <p className="mt-3 text-lg text-muted">{post.description}</p>
      </div>

      <hr className="border-border mb-8" />

      <div className="prose">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }] as any],
            },
          }}
        />
      </div>
    </article>
  );
}
