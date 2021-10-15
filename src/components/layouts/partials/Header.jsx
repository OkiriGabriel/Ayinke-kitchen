import React, {useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <>
            <nav className="navbar navbar-dark dash-bar">
                                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                            <span className="menu_toggle">
                            <span className="hamburger">
                                <span />
                                <span />
                                <span />
                            </span>
                            <span className="hamburger-cross">
                                <span />
                                <span />
                            </span>
                            </span>
                        </button>
                <ul className="navbar-nav px-3">
                
                </ul>
            </nav>
        </>
    )

}

export default Header;