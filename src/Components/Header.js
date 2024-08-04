import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../Assets/movieLogo.png';
import userIcon from '../Assets/movieProfile.png';
import { navigation } from '../Constants/Nav';

const Header = () => {
    const location = useLocation();
    const removeSpace = location.search.slice(3).split("%20").join(" ");
    const [searchInput, setSearchInput] = useState(removeSpace);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`);
        }
    }, [searchInput, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchInput}`);
    };

    return (
        <header className='fixed top-0 w-full h-20 bg-neutral-600 bg-opacity-50 flex items-center justify-between px-6 z-40'>
            <Link to="/">
                <img src={logo} alt='logo' width={50} />
            </Link>
            <nav className='hidden lg:flex items-center gap-3 ml-4'>
                {navigation.map((nav) => (
                    <NavLink key={nav.label} to={nav.href} className={({ isActive }) => `px-3 hover:text-red-400 ${isActive ? "text-neutral-300" : "text-white"}`}>
                        {nav.label}
                    </NavLink>
                ))}
            </nav>
            <div className='flex items-center ml-auto gap-5'>
                <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Search'
                        className='bg-neutral-600 bg-opacity-50 px-4 py-1 outline-none border-none hidden lg:block'
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                    />
                    <button className='text-2xl text-white rounded'>
                        <IoSearchOutline />
                    </button>
                </form>
                <div className='cursor-pointer active:scale-50 transition-all'>
                    <img src={userIcon} alt='User Icon' className='w-10 h-10 rounded-full' />
                </div>
            </div>
        </header>
    );
};

export default Header;
