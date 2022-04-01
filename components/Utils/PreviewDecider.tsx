import React, { useEffect, useState } from 'react'

import {
    fetcher,
    isValidURL,
    parseYoutubeVideoId,
} from '../../utils/helpers/common'

interface PreviewDeciderProps {
    textToDetect: string
}

export const PreviewDecider = ({ textToDetect }: PreviewDeciderProps) => {
    const [isUrlPreviewImage, setIsUrlPreviewImage] = useState('')
    const isYoutubeLink = parseYoutubeVideoId(textToDetect)

    useEffect(() => {
        if (isValidURL(textToDetect)) {
            fetcher(
                `/api/fetchPreviewData?urlToHit=${isValidURL(textToDetect)}`
            ).then(imageUrl => {
                if (imageUrl.length) {
                    setIsUrlPreviewImage(imageUrl[0])
                } else {
                    setIsUrlPreviewImage('')
                }
            })
        }
    }, [])

    return isUrlPreviewImage || isYoutubeLink ? (
        <div className={'flex justify-start p-md ml-xl'}>
            {isYoutubeLink && isYoutubeLink.length > 0 ? (
                <iframe
                    src={`https://www.youtube.com/embed/${isYoutubeLink}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="video"
                />
            ) : isUrlPreviewImage ? (
                <img
                    src={isUrlPreviewImage}
                    alt="img"
                    className={'max-w-full h-full'}
                />
            ) : (
                <></>
            )}
        </div>
    ) : (
        <></>
    )
}
