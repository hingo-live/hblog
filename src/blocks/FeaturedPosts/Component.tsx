import React from 'react'
import type { FeaturedPostsBlock as FeaturedPostsBlockType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Card } from '@/components/Card'

export const FeaturedPostsBlock: React.FC<FeaturedPostsBlockType & { id?: string }> = (props) => {
  const { introContent, selectedPosts, layout } = props

  return (
    <div className="container my-16">
      {introContent && (
        <div className="mb-8">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}
      <div
        className={
          layout === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : layout === 'heroWithSide'
              ? 'grid grid-cols-1 lg:grid-cols-3 gap-6'
              : 'flex overflow-x-auto gap-6'
        }
      >
        {selectedPosts?.map((post, index) => {
          if (typeof post === 'object' && post !== null) {
            return (
              <Card
                key={post.id}
                doc={post}
                relationTo="posts"
                showCategories
                className={
                  layout === 'heroWithSide' && index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
