import React from 'react'
import Image from 'next/image'

interface props {
  height: string,
  width: string,
  frontImage: string,
  backInfo: React.ReactNode;
}
const FlipCard = ({height, width, frontImage, backInfo} : props) => {
  return (
    <div className='m-0 p-0 box-border font-sans'>
        <div className={`${height} ${width} perspective-[1000px] group`}>
            <div className='relative h-full w-full transform-3d transition-[transform] duration-800 ease-in-out transform group-hover:transform-[rotateY(180deg)]'>
                <div className='absolute h-full w-full backface-hidden inset-0 bg-red-200'>
                    <Image src={frontImage} alt='Product Img' fill style={{ objectFit: 'cover' }}/>
                </div>

                <div className='absolute h-full w-full backface-hidden inset-0 bg-blue-300 transform rotate-y-180'>
                    {backInfo}

                </div>
            </div>
        </div>
    </div>
  )
}

export default FlipCard
