import React from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import useFetchDetails from '../hooks/useFetchDetails';

const PlayVideo = ({ data, close, media_type }) => {
    
    const { data: videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`);

    return (
        <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded overflow-hidden relative'>
                
                <button onClick={close} className='absolute right-5 top-5 text-3xl z-50'>
                    <IoCloseCircleOutline />
                </button>

                <iframe
                    src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
                    className='w-full h-full'
                />
            </div>
        </section>
    );
};

export default PlayVideo;
