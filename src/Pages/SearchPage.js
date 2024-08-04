import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../Components/Card';
import axios from 'axios';

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchData = async () => {
    const query = new URLSearchParams(location.search).get('q');

    if (!query) {
      setData([]);
      return;
    }

    try {
      const response = await axios.get('/search/multi', {
        params: {
          query,
          page: page,
        },
      });
      setData(response.data.results);
    } catch (error) {
    }
  };

  useEffect(() => {
    setPage(1);
    setData([])
    fetchData();
  }, [location.search]);

  const handleScroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='py-20'>
      <div className='lg:hidden my-2 mx-1 sticky top-20 z-30'>
        <input 
          type='text'
          placeholder='Search'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className='px-4 py-1 text-lg w-full bg-white text-neutral-900'
        />
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold'>Search Results</h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map(searchData => (
            <Card data={searchData} key={searchData.id + "search"} media_type={searchData.media_type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
