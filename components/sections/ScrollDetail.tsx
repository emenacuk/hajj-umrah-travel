import Image from 'next/image'

interface ScrollDetailProps {
    title?: string;
    content?: string; // HTML string from editor
    image?: string;
    imageAlt?: string;
    imageTitle?: string;
}

export function ScrollDetail({
    title,
    content,
    image,
    imageAlt,
    imageTitle
}: ScrollDetailProps) {
    // Don't render if no content and no image provided
    if (!content && !image) {
        return null;
    }

    // Construct proper image URL
    const imageUrl = image
        ? (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')
            ? image
            : (() => {
                let finalPath = image
                if (finalPath.startsWith('/media/')) {
                    finalPath = finalPath
                } else if (finalPath.startsWith('media/')) {
                    finalPath = `/${finalPath}`
                } else if (finalPath.startsWith('/')) {
                    finalPath = `/media${finalPath}`
                } else {
                    finalPath = `/media/${finalPath}`
                }
                return `${MEDIA_BASE_URL}${finalPath}`
            })())
        : undefined;

    return (
        <section className="scroll-detail-section">
            <div className="container">
                <div className="scroll-detail-wrapper">
                    <div className="content">
                        <div className="text-content">
                            <div className='contenttext'>
                                {content && (
                                    <div className='scroll-content' dangerouslySetInnerHTML={{ __html: content }} />
                                )}
                            </div>
                        </div>
                    </div>
                    {imageUrl && (
                        <div className="image-container">
                            <Image
                                src={imageUrl}
                                alt={imageAlt || imageTitle || title || "Image"}
                                title={imageTitle}
                                width={400}
                                height={755}
                                priority
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
