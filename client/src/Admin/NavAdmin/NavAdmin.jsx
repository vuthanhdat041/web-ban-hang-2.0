
import React, { useState, useEffect, useContext } from 'react';
import './NavAdmin.scss';
import { NavLink } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { MdOutlineLogout } from "react-icons/md";

const NavAdmin = () => {

    const { logoutContext } = useContext(UserContext)


    return (
        <div className='adminContainer'>
            {/* <div>hi</div> */}
            <div className='text'>
                <div className='brand'>HELIOS</div>
                <div className='logout' onClick={() => logoutContext()}><MdOutlineLogout />
                </div>
            </div>

            <div className='adminNav'>
                <NavLink style={{ textDecoration: 'none' }} exact to="/homeAdmin/superAdmin" className='conTent' activeClassName='active'>Super Admin</NavLink>
                <NavLink style={{ textDecoration: 'none' }} to="/homeAdmin/productManager" className='conTent' activeClassName='active'>Quản lý sản phẩm  </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to="/homeAdmin/orderManager" className='conTent' activeClassName='active'>Quản lý đơn hàng</NavLink>
                <NavLink style={{ textDecoration: 'none' }} to="/homeAdmin/customerManager" className='conTent' activeClassName='active'>Quản lý khách hàng</NavLink>

            </div>
            <div>

            </div>
        </div>
    );
};

export default NavAdmin;
