import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = (await request.json()) as { slug?: string }

    const { slug } = body

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    // Find the post by slug
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    if (posts.docs.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const post = posts.docs[0]
    const currentLikes = post.likes || 0

    // Increment the like count
    await payload.update({
      collection: 'posts',
      id: post.id,
      data: {
        likes: currentLikes + 1,
      },
    })

    return NextResponse.json({ success: true, likes: currentLikes + 1 })
  } catch (error) {
    console.error('Error incrementing like count:', error)
    return NextResponse.json({ error: 'Failed to update like count' }, { status: 500 })
  }
}
