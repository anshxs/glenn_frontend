import type { Metadata } from 'next';

import PostRedirectClient from './PostRedirectClient';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: 'Glenn Post',
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

export default async function PostLinkPage({ params }: PageProps) {
  const { id } = await params;
  return <PostRedirectClient postId={id} />;
}
