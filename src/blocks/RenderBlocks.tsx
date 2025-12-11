import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FeaturedPostsBlock } from '@/blocks/FeaturedPosts/Component'
import { CategoryChipsBlock } from '@/blocks/CategoryChips/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { MostViewedBlock } from '@/blocks/MostViewed/Component'
import { VideoBlock } from '@/blocks/Video/Component'
import { NewsletterBlock } from '@/blocks/Newsletter/Component'
import { AuthorShowcaseBlock } from '@/blocks/AuthorShowcase/Component'
import { GridBlock } from '@/blocks/Grid/Component'
import { CustomCTABlock } from '@/blocks/CustomCTA/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  featuredPosts: FeaturedPostsBlock,
  categoryChips: CategoryChipsBlock,
  carousel: CarouselBlock,
  mostViewed: MostViewedBlock,
  video: VideoBlock,
  newsletter: NewsletterBlock,
  authorShowcase: AuthorShowcaseBlock,
  grid: GridBlock,
  customCta: CustomCTABlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
