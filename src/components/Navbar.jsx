import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { NavLink } from "react-router-dom";
import NavLinks from './NavLinks';
// import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';

// const themes = {
//     winter: 'winter',
//     dracula: 'dracula',
// };

// const getThemeFromLocalStorage = () => {
//     return localStorage.getItem('theme') || themes.winter;
// };


const Navbar = () => {

    // const [theme, setTheme] = useState(themes.winter);
    // const [theme, setTheme] = useState(getThemeFromLocalStorage());

    const dispatch = useDispatch();

    const handleTheme = () => {
        // const {winter, dracula} = themes;
        // const newTheme = theme === winter ? dracula : winter;
        // document.documentElement.setAttribute('data-theme', theme);
        // setTheme(newTheme);

        dispatch(toggleTheme());
    };

    // useEffect(() => {
    //     document.documentElement.setAttribute('data-theme', theme);
    //     localStorage.setItem('theme', theme);
    // }, [theme]);

    const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

    return (
        <nav className="bg-base-200">
            <div className="navbar align-element">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* TITLE */}
                    <NavLink to='/' className="hidden lg:flex btn btn-primary text-3xl items-center">C</NavLink>
                    {/* DROPDOWN */}
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <FaBarsStaggered className='h-6 w-6' />
                        </label>
                        <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'>
                            <NavLinks />
                        </ul>
                    </div>
                </div>
                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal">
                        <NavLinks />
                    </ul>
                </div>
                {/* Navbar End */}
                <div className="navbar-end">
                    {/* THEME ICONS */}
                    <label className='swap swap-rotate'>
                        {/* This hidden checkbox controls the state */}
                        <input type="checkbox" onChange={handleTheme} />

                        {/* Sun Icon */}
                        <BsSunFill className='swap-on h-4 w-4' />

                        {/* Moon Icon */}
                        <BsMoonFill className='swap-off h-4 w-4' />
                    </label>
                    {/* CART LINK */}
                    <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md ml-4'>
                        <div className="indicator">
                            <BsCart3 className='h-6 w-6' />
                            <span className='badge badge-sm badge-primary indicator-item'>{numItemsInCart}</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
);
}
export default Navbar;