import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

import ProfileRedirectClient from './ProfileRedirectClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ProfileRecord = {
  id: string;
  username: string | null;
  name: string | null;
  avatarurl: string | null;
  bio: string | null;
};

function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function normalizeUsername(slug: string) {
  if (!slug) return null;
  return slug.startsWith('@') ? slug.slice(1) : slug;
}

function truncateText(value: string, max = 160) {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

async function getProfileData(slug: string) {
  const username = normalizeUsername(slug);
  if (!username) return null;

  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from('public_userdata')
    .select('id, username, name, avatarurl, bio')
    .eq('username', username)
    .maybeSingle<ProfileRecord>();

  return data;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const username = normalizeUsername(slug);
  const profile = username ? await getProfileData(username) : null;
  const url = `https://glennesports.app/@${username ?? 'user'}`;

  if (!profile) {
    return {
      title: 'Glenn Profile',
      description: 'Open this Glenn profile in the app.',
      openGraph: {
        type: 'profile',
        siteName: 'GLENN Esports',
        url,
        title: 'Glenn Profile',
        description: 'Open this Glenn profile in the app.',
        images: [
          {
            url: 'https://glennesports.app/logo.png',
            width: 1200,
            height: 630,
            alt: 'Glenn Profile',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Glenn Profile',
        description: 'Open this Glenn profile in the app.',
        images: ['https://glennesports.app/logo.png'],
      },
    };
  }

  const title = `${profile.name?.trim() || `@${profile.username}`} on Glenn`;
  const description = truncateText(
    profile.bio?.trim() || 'View this Glenn player profile in the app.',
  );
  const image = profile.avatarurl?.trim() || 'https://glennesports.app/logo.png';

  return {
    title,
    description,
    openGraph: {
      type: 'profile',
      siteName: 'GLENN Esports',
      url: `https://glennesports.app/@${profile.username}`,
      title,
      description,
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
      description,
      images: [image],
    },
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug.startsWith('@')) {
    notFound();
  }

  return <ProfileRedirectClient username={slug} />;
}
