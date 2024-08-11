import React, { useRef } from 'react';
import Card from './Card';
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";


const HorizontalScrollCard = ({data = [], heading, trending, media_type}) => {

    const containerRef = useRef()

    const handleNext = () => {
        containerRef.current.scrollLeft -= 300
      };
    
    const handlePrev = () => {
        containerRef.current.scrollLeft += 300
      };

  return (
    <div className='container mx-auto px-3 my-10'>
        <h2 className='text-lg lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>

        <div className='relative'>
            <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit, 230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none'>
                {
                    data.map((data, index) => {
                        return (
                            <Card key={data.id+"heading"+index} data={data} index={index+1} trending={trending} media_type={media_type} />
                        )
                    })
                }
            </div>

            <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
                <button onClick={handleNext} className='p-2 rounded-full text-3xl z-10 text-white -ml-2'>
                    <FiArrowLeftCircle/>
                </button>
                <button onClick={handlePrev} className='p-2 rounded-full text-3xl z-10 text-white -mr-2'>
                    <FiArrowRightCircle/>
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default HorizontalScrollCard;