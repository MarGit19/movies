import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import MobileNav from './Components/MobileNav';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './Store/MovieSlice';

function App() {

  const dispatch = useDispatch()

  const fetchTrendiingData = async() => {
    try {
      const response = await axios.get('trending/all/week')

      dispatch(setBannerData(response.data.results))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchConfiguration = async() => {
    try {
      const response = await axios.get("/configuration")

      dispatch(setImageURL(response.data.images.secure_base_url+"original"))
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchTrendiingData()
    fetchConfiguration()
  }, [])



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
