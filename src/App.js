import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import MobileNav from './Components/MobileNav';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './Store/MovieSlice';

const fetchTrendiingData = async(dispatch) => {
  try {
    const response = await axios.get('trending/all/week');
    dispatch(setBannerData(response.data.results));
  } catch (error) {
    console.log(error);
  }
};

const fetchConfiguration = async(dispatch) => {
  try {
    const response = await axios.get('/configuration');
    dispatch(setImageURL(response.data.images.secure_base_url + 'original'));
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTrendiingData(dispatch);
    fetchConfiguration(dispatch);
  }, [dispatch]);

  return (
    <main className='pb-16 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh]'>
        <Outlet />
      </div>
      <Footer />
      <MobileNav />
    </main>
  );
}

export default App;
