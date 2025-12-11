import React from 'react'
import type { CustomCTABlock as CustomCTABlockType } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CustomCTABlock: React.FC<CustomCTABlockType & { id?: string }> = (props) => {
  const {
    heading,
    subheading,
    richText,
    backgroundImage,
    backgroundColor,
    links,
    alignment,
    fullWidth,
  } = props

  const bgClasses = {
    default: 'bg-gray-100 dark:bg-gray-800',
    primary: 'bg-blue-500 text-white',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
  }

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <div
      className={`my-16 py-16 relative overflow-hidden ${bgClasses[backgroundColor || 'default']} ${fullWidth ? '' : 'container rounded-lg'}`}
    >
      {backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage.url})` }}
        />
      )}
      <div
        className={`relative z-10 ${fullWidth ? 'container' : ''} flex flex-col ${alignmentClasses[alignment || 'center']}`}
      >
        {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
        {subheading && <p className="text-xl mb-4 opacity-90">{subheading}</p>}
        {richText && (
          <div className="mb-6 max-w-2xl">
            <RichText data={richText} enableGutter={false} />
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {links.map((linkItem, index) => (
              <CMSLink
                key={index}
                {...linkItem.link}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  linkItem.link?.appearance === 'outline'
                    ? 'border-2 border-current hover:bg-white/10'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
