import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

import PostRedirectClient from './PostRedirectClient';

type PageProps = {
  params: Promise<{ id: string }>;
};

type PostRecord = {
  id: string;
  user_id: string;
  text: string | null;
  image_url: string | null;
  created_at: string | null;
};

type AuthorRecord = {
  id: string;
  username: string | null;
  name: string | null;
};

function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function truncateText(value: string, max = 160) {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

async function getPostData(postId: string) {
  if (!postId || postId === 'undefined' || postId === 'null') {
    return null;
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data: post } = await supabase
    .from('community_messages')
    .select('id, user_id, text, image_url, created_at')
    .eq('id', postId)
    .maybeSingle<PostRecord>();

  if (!post) return null;

  const { data: author } = await supabase
    .from('public_userdata')
    .select('id, username, name')
    .eq('id', post.user_id)
    .maybeSingle<AuthorRecord>();

  return { post, author };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getPostData(id);

  if (!data) {
    return {
      title: 'Post',
      description: 'Open this Glenn post in the app.',
      openGraph: {
        type: 'article',
        siteName: 'GLENN Esports',
        title: 'Glenn Post',
        description: 'Open this Glenn post in the app.',
        url: `https://glennesports.app/post/${id}`,
        images: [
          {
            url: 'https://glennesports.app/logo.png',
            width: 1200,
            height: 630,
            alt: 'Glenn Post',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Glenn Post',
        description: 'Open this Glenn post in the app.',
        images: ['https://glennesports.app/logo.png'],
      },
    };
  }

  const { post, author } = data;
  const authorName = author?.name?.trim() || author?.username?.trim() || 'Glenn User';
  const body = truncateText(post.text || 'See this post on Glenn.');
  const title = `${authorName} on Glenn`;
  const image = post.image_url?.trim() || 'https://glennesports.app/logo.png';
  const url = `https://glennesports.app/post/${post.id}`;

  return {
    title,
    description: body,
    openGraph: {
      type: 'article',
      siteName: 'GLENN Esports',
      url,
      title,
      description: body,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: body,
      images: [image],
    },
  };
}

export default async function PostLinkPage({ params }: PageProps) {
  const { id } = await params;
  return <PostRedirectClient postId={id} />;
}
