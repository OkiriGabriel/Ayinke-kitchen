import React, {useEffect, useState, useContext, useRef} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import Placeholder from '../../layouts/partials/Placeholder'

import FoodContext from '../../../context/food/foodContext'
import FoodItemContext from '../../../context/foodItem/foodItemContext'
import UserContext from '../../../context/user/userContext'
import LocationContext from '../../../context/location/locationContext'
import AddressContext from '../../../context/address/addressContext'

import storage from '../../helpers/storage';
import colors from '../../helpers/colors';
import body from '../../helpers/body';

const SideMenu = () => {


    return(
        <>
  
  <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            <span className="fe fe-home pdr" />
                            Home
                        </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" to='/admin/food-items'>
                            <span className="fe fe-list pdr" />
                            Food Items
                        </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" to="/admin/orders">
                            <span className="fe fe-calendar pdr" />
                           Orders
                        </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" to="/admin/locations">
                            <span className="fe fe-map-pin pdr" />
                            Locations
                        </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" href="#">
                            <span className="fe fe-log-out pdr" />
                            Logout
                        </Link>
                        </li>
                    </ul>
                </div>
            </nav>


        </>
    )

}

export default SideMenu;