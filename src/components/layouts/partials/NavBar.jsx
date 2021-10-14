import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import storage from '../../helpers/storage'

import ContactModal from '../../layouts/partials/ContactModal'

const NavBar = ({ scrollTo, openModal, position }) => {
  const [show, setShow] = useState(false);

    let history = useHistory();

    const doScroll = (e, t, s) => {
       
        scrollTo(e, t, s)
        
    }

          
    const toggleModal = () => {
      setShow(!show);
  }
    const openM = (e) => {

        e.preventDefault();
        openModal();
        
    }

    const logout = (e) => {
        e.preventDefault();
        storage.clear();
        history.push('/signin')
    }

    return (
        <>
             <header id="header" className={`header ${position === true ? 'header-sticky': 'bg-brandccpurple'}`}>
                <div className="">
                
                    <div className="navigation">
                        <div className="container">
                        <nav className="main-nav navbar navbar-right navbar-expand-md">
                        <Link to="/" className="navbar-brand font-helveticabold fs-30 onwhite" href="">AYINKE KITCHEN</Link>
                        {/* <div>
                            <Link to="/" className="navbar-brand box-icon" href="">
                                <span><img src="fonts/icons/su/icon@boxes.svg" alt="box-icon" /></span>
                                <span><img src="fonts/icons/su/icon@caret.svg" alt="caret-icon" /></span>
                            </Link>
                        </div> */}

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
                        
                        <div id="navbar-collapse" className="navbar-collapse collapse">
                            <div className="orientation">
                                 {/* left */}
                                <ul className="nav navbar-nav brandss-dark pdl1">
                                    {/* <li className="nav-item font-gilroymedium"><Link onClick={(e) => doScroll(e, 'audit')} className="nav-link" to="">Audit</Link></li>
                                    <li className="nav-item font-gilroymedium"><Link onClick={(e) => doScroll(e, 'kronos')} className="nav-link" to="">Kronos</Link></li> */}
                                </ul>
                                {/* right */}
                                <ul className="nav navbar-nav ml-auto">
                                    <li className="nav-item brandccred font-helveticabold"><Link to="/" className="nav-link onwhite">Home</Link></li>
                                    <li className="nav-item brandccred font-helveticabold"><Link to="/search" className="nav-link onwhite">Search</Link></li>
                                    {
                                        !storage.checkToken() &&
                                        <li className="nav-item last"><Link onClick={toggleModal}  className="btn btn-mini mt-2 fs-14 font-helveticabold onwhite bg-orange">Contact</Link></li>
                                    }
                                </ul>
                            
                            </div>
                        </div>
                        </nav>
                    </div>
                    </div>
                
                </div>
            </header>

            <ContactModal isShow={show}  closeModal={toggleModal} />
           
        </>
    )

}

export default NavBar;