import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import type { ImageProps } from "../interface";

const cache = new Map<any, string>();

export default async function getBase64ImageUrl(image: any): Promise<string> {
  //   console.log(`https://d3leeb4r1qy96s.cloudfront.net/${image}`);
  let url = cache.get(`https://d3leeb4r1qy96s.cloudfront.net/${image}`);
  if (url) {
    return url;
  }
  const response = await fetch(`https://d3leeb4r1qy96s.cloudfront.net/${image}`);

  const buffer = await response.arrayBuffer();
  const minified = await imagemin.buffer(Buffer.from(buffer), {
    plugins: [imageminJpegtran()],
  });

  url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
  cache.set(image, url);
  return url;
}
