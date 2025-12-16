/**
 * Self-contained seed script for Cloudflare Workers
 * All data is inlined to avoid import issues with files outside src/
 */

import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Inline categories data
const categoriesData = [
  {
    id: 'category-1',
    name: 'Garden',
    handle: 'garden',
    description: 'Explore the world of gardening, from planting to harvesting.',
    color: 'indigo',
  },
  {
    id: 'category-2',
    name: 'Technology',
    handle: 'technology',
    description: 'Stay updated with the latest technology news and innovations.',
    color: 'blue',
  },
  {
    id: 'category-3',
    name: 'Fitness',
    handle: 'fitness',
    description: 'Discover workout routines, health tips, and wellness advice.',
    color: 'red',
  },
  {
    id: 'category-4',
    name: 'Finance',
    handle: 'finance',
    description: 'Financial news, investment strategies, and money management tips.',
    color: 'green',
  },
  {
    id: 'category-5',
    name: 'Travel',
    handle: 'travel',
    description: 'Travel guides, destination reviews, and adventure stories.',
    color: 'yellow',
  },
  {
    id: 'category-6',
    name: 'Photography',
    handle: 'photography',
    description: 'The art of photography, from landscape to portrait techniques.',
    color: 'purple',
  },
  {
    id: 'category-7',
    name: 'Music',
    handle: 'music',
    description: 'Music reviews, artist interviews, and industry trends.',
    color: 'pink',
  },
  {
    id: 'category-8',
    name: 'Architecture',
    handle: 'architecture',
    description: 'Architectural marvels, design trends, and construction insights.',
    color: 'gray',
  },
  {
    id: 'category-9',
    name: 'Wellness',
    handle: 'wellness',
    description: 'Mental and physical wellness, meditation, yoga, and healthy living.',
    color: 'teal',
  },
  {
    id: 'category-10',
    name: 'Education',
    handle: 'education',
    description: 'Educational trends, learning resources, and academic insights.',
    color: 'orange',
  },
]

// Inline authors data
const authorsData = [
  {
    id: 'author-1',
    name: 'Sarah Wilson',
    handle: 'sarah-wilson',
    description: 'Sarah Wilson is a workplace culture expert and digital nomad.',
  },
  {
    id: 'author-2',
    name: 'Dr. Michael Chen',
    handle: 'michael-chen',
    description: 'Dr. Michael Chen is an AI researcher and technology futurist.',
  },
  {
    id: 'author-3',
    name: 'Emma Green',
    handle: 'emma-green',
    description: 'Emma Green is an environmental activist and sustainability consultant.',
  },
  {
    id: 'author-4',
    name: 'Lisa Martinez',
    handle: 'lisa-martinez',
    description: 'Lisa Martinez is a certified fitness trainer and wellness coach.',
  },
  {
    id: 'author-5',
    name: 'David Thompson',
    handle: 'david-thompson',
    description: 'David Thompson is a financial analyst and cryptocurrency expert.',
  },
  {
    id: 'author-6',
    name: 'John Anderson',
    handle: 'john-anderson',
    description: 'John Anderson is a tech journalist and gadget reviewer.',
  },
  {
    id: 'author-7',
    name: 'Sophia Lee',
    handle: 'sophia-lee',
    description: 'Sophia Lee is a creative UX/UI designer.',
  },
  {
    id: 'author-8',
    name: 'Dr. James Wilson',
    handle: 'james-wilson',
    description: 'Dr. James Wilson is a medical researcher and health expert.',
  },
]

// Inline posts data
const postsData = [
  {
    id: 'post-1',
    title: "Lenovo's smarter devices stoke professional passions",
    handle: 'lenovo-smarter-devices',
    excerpt:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    date: '2025-06-10T12:00:00Z',
    readingTime: 2,
    viewCount: 2504,
    likeCount: 3007,
    commentCount: 11,
    authorId: 'author-1',
    categoryId: 'category-1',
  },
  {
    id: 'post-2',
    title: 'The Future of Remote Work in 2025 - Complete Guide',
    handle: 'future-of-remote-work-2025',
    excerpt:
      'Remote work is evolving rapidly. Discover the latest trends and technologies shaping the future of work.',
    date: '2025-05-15T12:00:00Z',
    readingTime: 4,
    viewCount: 3200,
    likeCount: 2800,
    commentCount: 23,
    authorId: 'author-2',
    categoryId: 'category-2',
  },
  {
    id: 'post-3',
    title: 'The Complete Guide to Living Sustainably',
    handle: 'sustainable-living-complete-guide',
    excerpt: 'Learn how to reduce your carbon footprint and live a more sustainable lifestyle.',
    date: '2025-04-20T12:00:00Z',
    readingTime: 6,
    viewCount: 4800,
    likeCount: 3500,
    commentCount: 45,
    authorId: 'author-3',
    categoryId: 'category-3',
  },
  {
    id: 'post-4',
    title: 'AI Revolution: What to Expect in the Next Decade',
    handle: 'ai-revolution-next-decade',
    excerpt: 'Exploring the potential impact of artificial intelligence on our daily lives.',
    date: '2025-03-05T12:00:00Z',
    readingTime: 5,
    viewCount: 5600,
    likeCount: 4200,
    commentCount: 67,
    authorId: 'author-2',
    categoryId: 'category-4',
  },
  {
    id: 'post-5',
    title: 'Fitness Trends That Will Dominate 2025',
    handle: 'fitness-trends-2025',
    excerpt: 'Discover the latest fitness innovations and workout trends reshaping the industry.',
    date: '2025-02-15T12:00:00Z',
    readingTime: 3,
    viewCount: 3800,
    likeCount: 2600,
    commentCount: 34,
    authorId: 'author-4',
    categoryId: 'category-3',
  },
  {
    id: 'post-6',
    title: 'Understanding Cryptocurrency in 2025',
    handle: 'understanding-cryptocurrency-2025',
    excerpt: 'A comprehensive guide to cryptocurrency trends and blockchain technology.',
    date: '2025-01-20T12:00:00Z',
    readingTime: 7,
    viewCount: 7200,
    likeCount: 4800,
    commentCount: 89,
    authorId: 'author-5',
    categoryId: 'category-4',
  },
  {
    id: 'post-7',
    title: 'Best Travel Destinations for Digital Nomads',
    handle: 'travel-destinations-digital-nomads',
    excerpt: 'Top cities and countries for remote workers looking for adventure.',
    date: '2025-01-10T12:00:00Z',
    readingTime: 5,
    viewCount: 4200,
    likeCount: 3100,
    commentCount: 52,
    authorId: 'author-1',
    categoryId: 'category-5',
  },
  {
    id: 'post-8',
    title: 'Photography Tips for Beginners',
    handle: 'photography-tips-beginners',
    excerpt: 'Master the basics of photography with these essential tips.',
    date: '2024-12-20T12:00:00Z',
    readingTime: 4,
    viewCount: 3500,
    likeCount: 2400,
    commentCount: 38,
    authorId: 'author-7',
    categoryId: 'category-6',
  },
  {
    id: 'post-9',
    title: 'The Rise of AI in Music Production',
    handle: 'ai-music-production',
    excerpt: 'How artificial intelligence is transforming the music industry.',
    date: '2024-12-15T12:00:00Z',
    readingTime: 6,
    viewCount: 4100,
    likeCount: 2900,
    commentCount: 44,
    authorId: 'author-6',
    categoryId: 'category-7',
  },
  {
    id: 'post-10',
    title: 'Modern Architecture Trends 2025',
    handle: 'modern-architecture-trends-2025',
    excerpt: 'Exploring cutting-edge architectural designs and sustainable building.',
    date: '2024-12-10T12:00:00Z',
    readingTime: 5,
    viewCount: 2900,
    likeCount: 2100,
    commentCount: 29,
    authorId: 'author-8',
    categoryId: 'category-8',
  },
  {
    id: 'post-11',
    title: 'Mindfulness and Meditation Guide',
    handle: 'mindfulness-meditation-guide',
    excerpt: 'A complete guide to starting your mindfulness journey.',
    date: '2024-12-05T12:00:00Z',
    readingTime: 8,
    viewCount: 5200,
    likeCount: 3800,
    commentCount: 61,
    authorId: 'author-4',
    categoryId: 'category-9',
  },
  {
    id: 'post-12',
    title: 'Online Learning Platforms Comparison',
    handle: 'online-learning-platforms-2025',
    excerpt: 'Compare the best online learning platforms for skill development.',
    date: '2024-12-01T12:00:00Z',
    readingTime: 7,
    viewCount: 4600,
    likeCount: 3200,
    commentCount: 55,
    authorId: 'author-8',
    categoryId: 'category-10',
  },
  {
    id: 'post-13',
    title: 'Smart Home Technology in 2025',
    handle: 'smart-home-technology-2025',
    excerpt: 'The latest innovations in home automation and IoT devices.',
    date: '2024-11-25T12:00:00Z',
    readingTime: 5,
    viewCount: 3900,
    likeCount: 2700,
    commentCount: 41,
    authorId: 'author-6',
    categoryId: 'category-2',
  },
  {
    id: 'post-14',
    title: 'Investment Strategies for Beginners',
    handle: 'investment-strategies-beginners',
    excerpt: 'Start your investment journey with these proven strategies.',
    date: '2024-11-20T12:00:00Z',
    readingTime: 6,
    viewCount: 5100,
    likeCount: 3600,
    commentCount: 58,
    authorId: 'author-5',
    categoryId: 'category-4',
  },
  {
    id: 'post-15',
    title: 'Urban Gardening Tips and Tricks',
    handle: 'urban-gardening-tips',
    excerpt: 'How to create a thriving garden in small urban spaces.',
    date: '2024-11-15T12:00:00Z',
    readingTime: 4,
    viewCount: 2800,
    likeCount: 1900,
    commentCount: 26,
    authorId: 'author-3',
    categoryId: 'category-1',
  },
]

// Create Lexical content from plain text
function createLexicalContent(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Key Highlights',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          tag: 'h2',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export const seedInline = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<{ categories: number; authors: number; posts: number }> => {
  payload.logger.info('Seeding database with inline data...')

  // Clear existing data
  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: { navItems: [] },
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  // Maps to store created document IDs
  const categoryMap: Map<string, number> = new Map()
  const authorMap: Map<string, number> = new Map()

  payload.logger.info(`— Seeding categories (${categoriesData.length})...`)

  // Create categories
  for (const category of categoriesData) {
    try {
      const categoryDoc = await payload.create({
        collection: 'categories',
        data: {
          title: category.name,
          slug: category.handle,
          description: category.description,
          color: category.color,
        },
      })
      categoryMap.set(category.id, categoryDoc.id)
    } catch (e) {
      payload.logger.error(`Failed to create category ${category.name}: ${e}`)
    }
  }

  payload.logger.info(`— Seeding authors (${authorsData.length})...`)

  // Delete existing demo users
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { contains: '@demo.example.com' } },
  })

  // Create authors as users
  for (const author of authorsData) {
    try {
      const userDoc = await payload.create({
        collection: 'users',
        data: {
          name: author.name,
          email: `${author.handle}@demo.example.com`,
          password: 'password123',
          role: 'author',
          bio: author.description,
          slug: author.handle,
        },
      })
      authorMap.set(author.id, userDoc.id)
    } catch (e) {
      payload.logger.error(`Failed to create author ${author.name}: ${e}`)
    }
  }

  payload.logger.info(`— Seeding posts (${postsData.length})...`)

  // Create posts
  let postCount = 0
  for (const post of postsData) {
    try {
      const categoryId = categoryMap.get(post.categoryId)
      const authorId = authorMap.get(post.authorId)

      await payload.create({
        collection: 'posts',
        depth: 0,
        context: { disableRevalidate: true },
        data: {
          title: post.title,
          slug: post.handle,
          excerpt: post.excerpt,
          content: createLexicalContent(post.excerpt),
          categories: categoryId ? [categoryId] : [],
          authors: authorId ? [authorId] : [],
          _status: 'published',
          publishedAt: post.date,
          readingTime: post.readingTime,
          views: post.viewCount,
          likes: post.likeCount,
          commentsCount: post.commentCount,
          featured: postCount < 5,
        },
      })
      postCount++
    } catch (e) {
      payload.logger.error(`Failed to create post ${post.title}: ${e}`)
    }
  }

  payload.logger.info('✅ Seeding complete!')

  return {
    categories: categoryMap.size,
    authors: authorMap.size,
    posts: postCount,
  }
}
