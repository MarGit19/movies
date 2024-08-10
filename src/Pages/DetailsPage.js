import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import HorizontalScrollCard from '../Components/HorizontalScrollCard';
import PlayVideo from '../Components/PlayVideo';

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector(state => state.movieData.imageURL);
  const { data, loading, error } = useFetchDetails(`/${params.explore}/${params.id}`);
  const { data: castData } = useFetchDetails(`/${params.explore}/${params.id}/credits`);
  const { data: similarData } = useFetch(`/${params.explore}/${params.id}/similar`);
  const { data: recommendationsData } = useFetch(`/${params.explore}/${params.id}/recommendations`);
  
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data) return <div>No data available</div>;

  const duration = (Number(data.runtime) / 60).toFixed(1).split(".");
  const writer = castData?.crew?.filter(el => el.job === "Writer").map(el => el.name).join(", ") || "N/A";
  const director = castData?.crew?.find(el => el.job === "Director")?.name || "N/A";

  return (
    <div>
      <div className='w-full h-[300px] relative hidden lg:block'>
        {data.backdrop_path ? (
          <div className='w-full h-full'>
            <img
              src={imageURL + data.backdrop_path}
              className='w-full h-full object-cover'
              alt={data.title || 'Backdrop Image'}
            />
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gray-200'>
            <span>No Image Available</span>
          </div>
        )}
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to transparent/90'></div>
      </div>
      <div className='container mx-auto px-4 py-20 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto lg:mt-0 lg:mx-0 w-fit mb-5'>
          <img
            src={imageURL + data.poster_path}
            className='w-100 h-100 object-cover rounded'
            alt={data.title || 'Poster Image'}
          />
          <button onClick={() => handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center bg-red-600 text-white rounded font-bold text-lg hover:bg-white hover:text-black hover:scale-105 transition-all'>Play Movie</button>
        </div>

        <div>
          <h2 className='text-2xl font-bold text-white'>{data.title || data.name}</h2>
          <p className='text-neutral-400 xl pb-3'>{data.tagline}</p>

          <hr />
          <div className='flex items-center gap-4 my-3'>
            <p>
              Rating: {Number(data.vote_average).toFixed(1)}
            </p>
            <p>
              <span>|</span>
            </p>
            <p>
              Views: {Number(data.vote_count)}
            </p>
            <p>
              <span>|</span>
            </p>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>

          <hr />
          <div className='pt-3 pb-3'>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data.overview}</p>
          </div>

          <hr />
          <div className='flex items-center flex-row gap-4 my-3'>
            <p>Status: {data.status}</p>
            <span>|</span>
            <p>Released Date: {moment(data.release_date).format("MMMM Do YYYY")}</p>
          </div>

          <hr />
          <div className='flex items-center flex-row gap-4 my-3'>
            <p><span className='text-white'>Director</span>: {director}</p>
          </div>
          <hr />
          <div className='flex items-center flex-row gap-4 my-3'>
            <p><span className='text-white'>Writer</span>: {writer}</p>
          </div>
          <hr />
          <div className='gap-4 my-3'>
            <h2 className='text-white mb-5'>Cast: </h2>
            <div className='flex flex-wrap gap-5'>
              {
                castData?.cast?.filter(el => el?.profile_path).map((starCast) => {
                  return (
                    <div key={starCast.id} className='flex flex-col items-center'>
                      <img 
                        src={imageURL + starCast?.profile_path}
                        className='w-20 h-20 rounded-full object-cover'
                        alt={starCast?.name || 'Cast Image'}
                      />
                      <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore} />
        <HorizontalScrollCard data={recommendationsData} heading={"Recommended " + params?.explore} media_type={params?.explore} />
      </div>

      {playVideo && (
        <PlayVideo data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
      )}
    </div>
  );
};

export default DetailsPage;
