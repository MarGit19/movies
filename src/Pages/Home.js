import HomeBanner from '../Components/HomeBanner';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../Components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData);
  const { data : nowPlayingData } = useFetch('/movie/now_playing')
  const { data : topRatedData } = useFetch('/movie/top_rated')
  const { data : popularTvShowData } = useFetch('/tv/popular')
  const { data : onTheAirShowData } = useFetch('/tv/on_the_air')

  return (
    <div>
      <HomeBanner />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true}/>
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
      <HorizontalScrollCard data={topRatedData} heading={"Top Movies"} media_type={"movie"} />
      <HorizontalScrollCard data={popularTvShowData} heading={"Top TV Shows"} media_type={"tv"} />
      <HorizontalScrollCard data={onTheAirShowData} heading={"Live TV Shows"} media_type={"tv"}/>
    </div>
  );
}

export default Home;
