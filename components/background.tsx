import Image from 'next/image'
import image from '../public/bg.png'

export default function Background() {
  return (
    <Image
      alt="Mountains"
      src={image}
      placeholder="blur"
      quality={100}
      fill
      layout="fill"
      sizes="100vw"
      style={{
        objectFit: 'cover'
      }}
    />
  )
}
