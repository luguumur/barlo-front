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
      <Script type="text/javascript" src="//cdn.rlets.com/capture_configs/80d/284/0d3/7c04b0caec9fa526ffad16a.js" async={true}></Script>
    </NextHead>
  )
}

export default Head
