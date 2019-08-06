import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from '../component/Auth/signout';


const Navbar = ({ session }) => (
    <nav>
        {session && session.getCurrentUser ? (<NavbarAuth session={session} />) :
            (<NavbarUnAuth />)
        }
    </nav>
)

const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li>
                <NavLink to='/' exact>Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/add">Add Recipe</NavLink>
            </li>
            <li>
                <NavLink to="/profile">profile</NavLink>
            </li>
            <li>
                <Signout />
            </li>
        </ul>
        <h4>Welcome , <strong>{session && session.getCurrentUser.username}</strong></h4>
    </Fragment>
);


const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/signin">signin</NavLink>
        </li>
        <li>
            <NavLink to="/signup">signup</NavLink>
        </li>
    </ul>
)
export default Navbar;