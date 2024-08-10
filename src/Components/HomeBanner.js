import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import PlayVideo from './PlayVideo';

const HomeBanner = () => {
    const bannerData = useSelector(state => state.movieData.bannerData);
    const imageURL = useSelector(state => state.movieData.imageURL);
    const [currentImage, setCurrentImage] = useState(0);
    const [playVideo, setPlayVideo] = useState(false);
    const [playVideoId, setPlayVideoId] = useState('');

    const handleNext = useCallback(() => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1);
        }
    }, [currentImage, bannerData.length]);

    const handlePrev = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    const handlePlayVideo = (videoId) => {
        setPlayVideoId(videoId);
        setPlayVideo(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage < bannerData.length - 1) {
                handleNext();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [bannerData, currentImage, handleNext]);

    return (
        <section className='w-full h-full'>
            {playVideo && (
                <PlayVideo videoId={playVideoId} close={() => setPlayVideo(false)} media_type='explore' />
            )}
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {bannerData.map((data, index) => (
                    <div key={`${data.id}HomeBanner${index}`} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                        <div className='w-full h-full'>
                            <img src={`${imageURL}${data.backdrop_path}`} className='h-full w-full object-cover' alt={data.title} />
                        </div>
                        <div className='absolute top-0 w-full h-full hidden items-center justify-between px-5 group-hover:lg:flex'>
                            <button onClick={handlePrev} className='p-1 rounded-full text-3xl z-10 text-white'>
                                <FiArrowLeftCircle />
                            </button>
                            <button onClick={handleNext} className='p-2 rounded-full text-3xl z-10 text-white'>
                                <FiArrowRightCircle />
                            </button>
                        </div>
                        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
                        <div className='container mx-auto'>
                            <div className='w-full absolute bottom-0 max-w-md px-5'>
                                <h2 className='font-bold text-3xl lg:text-4xl text-white drop-shadow-2xl'>{data.title}</h2>
                                <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                <div className='flex items-center gap-4'>
                                    <p>Ratings: {Number(data.vote_average).toFixed(1)}</p>
                                    <span>|</span>
                                    <p>Views: {Number(data.popularity).toFixed(0)}</p>
                                </div>
                                <button onClick={() => handlePlayVideo(data.id)} className='bg-red-600 px-4 py-2 text-white font-bold rounded mt-4 hover:bg-white hover:text-black transition-all hover:scale-105'>
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeBanner;
