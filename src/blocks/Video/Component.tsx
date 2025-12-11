import React from 'react'
import type { VideoBlock as VideoBlockType } from '@/payload-types'
import RichText from '@/components/RichText'

export const VideoBlock: React.FC<VideoBlockType & { id?: string }> = (props) => {
  const {
    introContent,
    videoSource,
    uploadedVideo,
    videoUrl,
    poster,
    caption,
    autoPlay,
    loop,
    muted,
  } = props

  const getEmbedUrl = (url: string, source: string) => {
    if (source === 'youtube') {
      const videoId = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      )?.[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }
    if (source === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/)?.[1]
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url
    }
    return url
  }

  return (
    <div className="container my-16">
      {introContent && (
        <div className="mb-8">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
        {videoSource === 'upload' && uploadedVideo && typeof uploadedVideo === 'object' ? (
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay={autoPlay || false}
            loop={loop || false}
            muted={muted || false}
            poster={poster && typeof poster === 'object' && poster.url ? poster.url : undefined}
          >
            <source src={uploadedVideo.url || ''} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (videoSource === 'youtube' || videoSource === 'vimeo') && videoUrl ? (
          <iframe
            className="w-full h-full"
            src={getEmbedUrl(videoUrl, videoSource)}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : videoSource === 'external' && videoUrl ? (
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay={autoPlay || false}
            loop={loop || false}
            muted={muted || false}
            poster={poster && typeof poster === 'object' && poster.url ? poster.url : undefined}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No video configured
          </div>
        )}
      </div>
      {caption && <p className="mt-4 text-center text-gray-600 dark:text-gray-400">{caption}</p>}
    </div>
  )
}
