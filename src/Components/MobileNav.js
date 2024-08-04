import React from 'react';
import { mobileNav } from '../Constants/Nav'
import { NavLink } from 'react-router-dom';

const MobileNav = () => {
  return (
    <section className='lg:hidden h-20 bg-neutral-600 bg-opacity-50 backdrop-blur-3xl fixed bottom-0 w-full z-40'>
        <div className='flex items-center justify-between h-full text-neutral-200'>
            {
                mobileNav.map((nav, index) => {
                    return (
                        <NavLink 
                            key={nav.label+"mobilenav"}
                            to={nav.href}
                            className={({isActive}) => `px-3 flex h-full items-center flex-col justify-center ${isActive && "text-white"}`}
                        >
                            <div className='text-2xl'>
                                {nav.icon}
                            </div>
                            <p className='text-sm'>{nav.label}</p>
                        </NavLink>
                        )
                    })
            }
        </div>
    </section>
  )
}

export default MobileNav