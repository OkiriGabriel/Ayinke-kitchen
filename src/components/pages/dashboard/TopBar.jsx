import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom'
import storage from '../../helpers/storage';
import Placeholder from '../../layouts/partials/Placeholder';
import UserContext from '../../../context/user/userContext'
import FoodModal from './FoodModal';
import FeedModal from '../FeedModal';
import colors from '../../helpers/colors'

const TopBar = ({ user, userLoading, background }) => {

    const history = useHistory();

    const userContext = useContext(UserContext);

    const [show, setShow] = useState(false);
    const [ham, setHam] = useState(false)

    useEffect(() => {

        redirectToLogin();
        
    }, []);

    const toggleModal = (e) => {
        if(e){
          e.preventDefault();
        }
        setShow(!show);
      }

    const redirectToLogin = () => {

        if(!storage.checkToken()){
            
            let sq, qp;
            if(storage.checkSearchQuery()){
                sq = storage.getSearchQuery();
                qp = storage.getQueryParams();

                localStorage.setItem('searchQuery', sq);
                localStorage.setItem('queryParams', qp);
            }

            localStorage.clear();

            history.push('/login');

        }

    }

    const logout = (e) => {
        e.preventDefault();

        let sq, qp;
        if(storage.checkSearchQuery()){
            sq = storage.getSearchQuery();
            qp = storage.getQueryParams();
        }

        localStorage.clear();
        localStorage.setItem('searchQuery', sq);
        localStorage.setItem('queryParams', qp);

        history.push('/');
    }

    const toggleHam = () => {
        setHam(!ham)
    }


    return (
        <>

            <header className={`dash-header ${background ? background : ''}`}>
                <nav className="bar">

                    <div className="container">
                        
                        <div className="topbar">

                            <div className="user-dp">
                            {
                                userContext.user.logo &&
                                <>
                                    <img src={userContext.user.logo === 'no-logo.jpg' ? '../../../images/assets/avatar-bag.svg' : userContext.user.logo} alt="avatar" />
                                </>
                            }
                            {
                                !userContext.user.logo && 
                                <>
                                    <img src="../../../images/assets/avatar-bag.svg" alt="user-dp"/>
                                </>
                            }
                                
                            </div>
                            <div className="user-name font-metromedium">
                                {
                                    userLoading &&
                                    <Placeholder width="90px" />
                                }
                                {
                                    !userLoading &&
                                    <p className="mrgb0" style={{color: colors.primary.green}}>{user.resturantName ? user.resturantName : ''}</p>
                                }
                                
                            </div>
                            <div className="topbar-options">
                                <div className="ui-group-button">

                                    {/* <a href="https://wa.me/+2348164734220" target="_blank" className="brand-orange">
                                        <span className="" style={{position: 'relative', top: '1px'}}>
                                            <img src="../../../images/assets/icon@whatsapp.svg" width="25px" />
                                        </span> 
                                    </a> &nbsp; */}

                                    <Link onClick={(e) => toggleModal(e)} to="/" className="brand-orange">
                                        <span className="fs-20 chk-icon" style={{position: 'relative', top: '0px'}}>
                                            <img src="../../../images/icons/feedback.svg" className="icon"/>
                                        </span> 
                                    </Link> &nbsp;

                                    <a onClick={toggleHam} className="brand-orange" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className={`fe fe-${ham ? 'x' : 'menu'} text-muted fs-20`} style={{position: 'relative', top: '2px'}}></span> 
                                    </a> &nbsp;
                                    
                                </div>
                            </div>

                        </div>

                    </div>
                    
                </nav>
                
            </header>

            <FeedModal isShow={show} closeModal={toggleModal} />

        </>

    )

}

export default TopBar;