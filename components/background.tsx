import Image from 'next/image'
import image from '../public/bg.webp'

export default function Background() {
  return (
    <Image
      alt="Background"
      src={image}
      placeholder="blur"
      quality={100}
      // fill

      layout="fill"
      
      objectFit="cover"
    />
  )
}
