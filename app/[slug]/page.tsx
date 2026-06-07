import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProfileRedirectClient from './ProfileRedirectClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function normalizeUsername(slug: string) {
  const decodedSlug = decodeURIComponent(slug || '');
  if (!decodedSlug) return null;
  return decodedSlug.startsWith('@') ? decodedSlug.slice(1) : decodedSlug;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const username = normalizeUsername(slug);
  const url = `https://glennesports.app/@${username ?? 'user'}`;

  return {
    title: username ? `@${username} on Glenn` : 'Glenn Profile',
    description: 'Open this Glenn profile in the app.',
    openGraph: {
      type: 'profile',
      siteName: 'GLENN Esports',
      url,
      title: username ? `@${username} on Glenn` : 'Glenn Profile',
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
      title: username ? `@${username} on Glenn` : 'Glenn Profile',
      description: 'Open this Glenn profile in the app.',
      images: ['https://glennesports.app/logo.png'],
    },
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  if (!decodedSlug.startsWith('@')) {
    notFound();
  }

  return <ProfileRedirectClient username={decodedSlug} />;
}
