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

    const history = useHistory();
    const inputFile = useRef(null);

    const foodContext = useContext(FoodContext);
    const foodItemContext = useContext(FoodItemContext);
    const userContext = useContext(UserContext);
    const locationContext = useContext(LocationContext);
    const addressContext = useContext(AddressContext);

    const [showU, setShowU] = useState(false);
    const [imgSource, SetImageSource] = useState('');
    const [dpFile, setDpFile] = useState();

    useEffect(() => {

        redirectToLogin();
        fetchDefaults();

    }, [])

    const fetchDefaults = async () => {

        if(storage.checkToken() && storage.checkUserID()){
            userContext.getUser();
            body.changeBackground('dash-bg')
        }

    }

    const toggleUModal = (e) => {
        if(e){
            e.preventDefault();
        }
        setShowU(!showU);
    }

    const redirectToLogin = async () => {

        if(!storage.checkToken() && !storage.checkUserID()){

            localStorage.clear();
            body.dismissBackground('dash-bg')
            history.push('/login');

        }

    }


    const openDialog = async (e) => {
        e.preventDefault();
        inputFile.current.click();
    }
    
    const getImageSource = (file) => {
    
        let reader = new FileReader();
        reader.onloadend = (e) => {
            SetImageSource(e.target.result);
            setDpFile(reader.result);

            uploadImage(e.target.result, userContext.user._id);
        };
        reader.readAsDataURL(file);
      
    }

    const browseFile = (e, type) => {
        
        if (e.target.files && e.target.files[0]) {
    
            if (e.target.files[0].size > 5000000) {
                // return alert here
            }

            getImageSource(e.target.files[0], type);
            
        }
    }

    const uploadImage = async (image, id) => {

        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                ContentType: 'application/json'
            }
        }

            const data = {
                file: image,
                fileName: userContext.user.resturantName
            }

            
            await Axios.put(`${process.env.REACT_APP_API_URL}/users/upload-logo/${id}`, data, config)
            .then(async (resp) => {

                if(resp.data.data.logo === true){
                    await userContext.getUser();
                }

                console.log(resp);
        

            }).catch(err => {
                console.log(err);
            })

    }

    const logout = async (e) => {

        e.preventDefault();
        await storage.clearAuth();
        history.push('/');

        await Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);

    }


    return(
        <>
            
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse">
                <div className="sidebar-sticky">


                    <div className="ui-text-center rt--bx side-bar">

                    <div className="dp--bx">
                    <input type="file" className="ui-hide" ref={inputFile} onChange={(e) => browseFile(e)} accept="image/x-png,image/jpg,image/jpeg,image/png" />
                    <span className={`edit ${imgSource ? 'round' : ''}`}>
                        <Link onClick={(e) => openDialog(e)} to=""><i className="fe fe-edit-3"></i></Link>
                    </span>
                    {
                        userContext.user.logo &&
                        <>
                            {
                                imgSource &&
                                <img src={imgSource} alt="avatar" />
                            }{
                                !imgSource &&
                                <img src={userContext.user.logo === 'no-logo.jpg' ? '../../../images/assets/avatar-bag.svg' : userContext.user.logo} alt="avatar" />
                            }
                        </>
                    }
                    {
                       !userContext.user.logo && 
                       <>
                            {
                                imgSource &&
                                <img src={imgSource} alt="avatar" />
                            }
                            {
                                !imgSource &&
                                <img src="../../../images/assets/avatar-bag.svg" alt="avatar" />
                            }
                       </>
                    }
                </div>

                    <h3 className="mrgb0 fs-16 font-metrobold" style={{color: colors.primary.green}}>
                    {
                        userContext.loading &&
                        <Placeholder width="100px" backgroundColor="#f7cfb5" />
                    }{
                        !userContext.loading &&
                        <> { userContext.user ? userContext.user.resturantName : 'No Name'  } </>
                    }
                </h3>
                    <p class="mrgb0 ui-text-center text-muted font-metromedium fs-14 mt">
                    {
                        userContext.loading &&
                        <Placeholder width="8 0px" backgroundColor="#f7cfb5" />
                    }
                    {
                        !userContext.loading && userContext.user && userContext.user.username &&
                        <> 
                            <a href={`https://checkaam.com/${userContext.user.username}`} target="_blank" className="brand-orange fs-13 font-weight-medium">@{ userContext.user.username }</a>
                        </>
                    }
                    {
                        !userContext.loading && userContext.user && !userContext.user.username &&
                        <> 
                            <Link onClick={(e) => toggleUModal(e)} to="" className="brand-orange fs-13 font-weight-medium">Add Username</Link>
                        </>
                    }
                    
                </p>

                </div>


                    <ul className="nav flex-column sidebar-ul">

                    <li className="nav-item">
                        <Link className="nav-link font-metromedium" to="/dash/subscription">
                            <span className="chk-icon pdr1">
                                <img src="../../../images/icons/card.svg" alt="icon"/>
                            </span>
                            <span style={{position: 'relative', top: '1px', color: colors.primary.green}}>Subscription</span>
                            <span className="ml-auto fe fe-chevron-right fs-18 onsilver" style={{position: 'relative', top: '0px'}}></span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/dash/referal-program" className="nav-link font-metromedium">
                            <span className="chk-icon pdr1">
                                <img src="../../../images/icons/gift.svg" alt="icon"/>
                            </span>
                            <span style={{position: 'relative', top: '2px', color: colors.primary.green}}>Referral Program</span>
                            <span className="ml-auto fe fe-chevron-right fs-18 onsilver" style={{position: 'relative', top: '2px'}}></span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link font-metromedium" to="">
                            <span className="chk-icon pdr1">
                                <img src="../../../images/icons/chat.svg" alt="icon"/>
                            </span>
                            <span style={{position: 'relative', top: '1px', color: colors.primary.green}}>Contact Support</span>
                            <span className="ml-auto fe fe-chevron-right fs-18 onsilver" style={{position: 'relative', top: '0px'}}></span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link font-metromedium" to="/dash/preference">
                            <span className="chk-icon pdr1">
                                <img src="../../../images/icons/settings.svg" alt="icon"/>
                            </span>
                            <span style={{position: 'relative', top: '1px', color: colors.primary.green}}>Preferences</span>
                            <span className="ml-auto fe fe-chevron-right fs-18 onsilver" style={{position: 'relative', top: '0px'}}></span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link font-metromedium" to="/dashboard/about">
                            <span className="chk-icon pdr1">
                                <img src="../../../images/icons/about.svg" alt="icon"/>
                            </span>
                            <span style={{position: 'relative', top: '1px', color: colors.primary.green}}>About Checkaam</span>
                            <span className="ml-auto fe fe-chevron-right fs-18 onsilver" style={{position: 'relative', top: '0px'}}></span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link onClick={(e) => logout(e)} className="nav-link font-metromedium" to="">
                            <span className="chk-icon pdr1">
                                <img src="../../../images/icons/power.svg" alt="icon"/>
                            </span>
                            <span style={{position: 'relative', top: '1px', color: colors.primary.green}}>Logout</span>
                            <span className="ml-auto fe fe-chevron-right fs-18 onsilver" style={{position: 'relative', top: '0px'}}></span>
                        </Link>
                    </li>

                    <li className="nav-item"> 
                        <Link className="nav-link font-metromedium" to="">
                            <span className="onsilver fs-13">Rate Us</span>
                            <span className="ml-auto fs-13 onsilver">Version 1.0.2</span>
                        </Link>
                    </li>
                    
                </ul>
                </div>
            </nav>

        </>
    )

}

export default SideMenu;