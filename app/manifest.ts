import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GLENN - India\'s Ultimate Free Fire Esports Platform',
    short_name: 'GLENN Esports',
    description: 'Join India\'s premier Free Fire esports community. Compete in daily tournaments, climb leaderboards, connect with players, and earn real rewards.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#c8ff00',
    orientation: 'portrait',
    icons: [
      {
        src: '/android.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/logos.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    categories: ['games', 'sports', 'entertainment'],
    lang: 'en-IN',
  }
}
