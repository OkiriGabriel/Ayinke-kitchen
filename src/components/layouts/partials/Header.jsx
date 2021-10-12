import React, {useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <>
            <nav className="navbar navbar-dark dash-bar">
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <ul className="navbar-nav px-3">
                
                </ul>
            </nav>
        </>
    )

}

export default Header;