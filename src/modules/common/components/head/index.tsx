import NextHead from "next/head"
import Script from "next/script"
import React, { useEffect } from "react"

type HeadProps = {
  title?: string
  description?: string | null
  image?: string | null
}

const Head: React.FC<HeadProps> = ({ title, description, image }) => {

  return (
    <NextHead>
      <title>{`${title} | Barloworld Mongolia`}</title>
      <meta itemProp="name" content={title} />
      {description && <meta itemProp="description" content={description} />}
      {image && <meta itemProp="image" content={image} />}
      <link rel="icon" href="/assets/fav.svg" />
    </NextHead>
  )
}

export default Head
