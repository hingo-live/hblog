import React from 'react'
import type { AuthorShowcaseBlock as AuthorShowcaseBlockType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const AuthorShowcaseBlock: React.FC<AuthorShowcaseBlockType & { id?: string }> = (props) => {
  const { introContent, selectedAuthors, showBio, showSocialLinks, layout } = props

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
            : layout === 'carousel'
              ? 'flex overflow-x-auto gap-6'
              : 'space-y-6'
        }
      >
        {selectedAuthors?.map((author) => {
          if (typeof author === 'object' && author !== null) {
            return (
              <div
                key={author.id}
                className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md ${
                  layout === 'carousel' ? 'min-w-[300px] flex-shrink-0' : ''
                } ${layout === 'list' ? 'flex gap-4 items-center' : 'text-center'}`}
              >
                {author.avatar && typeof author.avatar === 'object' && (
                  <div
                    className={`${layout === 'list' ? 'w-16 h-16' : 'w-24 h-24 mx-auto'} rounded-full overflow-hidden mb-4`}
                  >
                    <Media resource={author.avatar} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={layout === 'list' ? 'flex-1' : ''}>
                  <h4 className="text-lg font-bold">{author.name}</h4>
                  {author.role && (
                    <span className="text-sm text-gray-500 capitalize">{author.role}</span>
                  )}
                  {showBio && author.bio && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {author.bio}
                    </p>
                  )}
                  {showSocialLinks && author.socialLinks && author.socialLinks.length > 0 && (
                    <div className="flex gap-3 mt-3 justify-center">
                      {author.socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
