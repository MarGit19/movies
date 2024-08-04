import { MdOutlineHome } from "react-icons/md";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";
import { IoSearchOutline } from 'react-icons/io5';

export const navigation = [
    {
        label: "TV Shows",
        href: "tv",
        icon: <PiTelevisionSimpleLight />
    },
    {
        label: "Movies",
        href: "movie",
        icon: <BiCameraMovie />
    }
];

export const mobileNav = [
    {
        label: "Home",
        href: "/",
        icon: <MdOutlineHome />
    },
    ...navigation,
    {
        label: "search",
        href: "/search",
        icon: <IoSearchOutline />
    }
];
