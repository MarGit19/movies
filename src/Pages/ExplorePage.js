import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Components/Card';
import axios from 'axios';

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);

  console.log("params", params.explore);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo
        }
      });
      setData((prev) => [
        ...prev,
        ...response.data.results
      ]);
    } catch (error) {
      console.log('error', error);
    }
  }, [params.explore, pageNo]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo(prev => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore, fetchData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='pt-20'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold'>Popular {params.explore} show</h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData) => (
            <Card data={exploreData} key={exploreData.id + "exploreSection"} media_type={params.explore} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
