import React, { useRef, useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import colors from '../../helpers/colors'

const BottomNav = ({ isFit }) => {

    const history = useHistory();

    const [linkActive, setActive] = useState(false);
    const [lType, setLType] = useState('home');

    useEffect(() => {

    }, [])

    const goto = (e, url, t) => {

        if(e){
            e.preventDefault()
        }

        setLType(t);
        history.push(url);

    }

    return(
        <>

            <div className={`bottom-nav ${isFit && isFit === true ? 'fit' : ''}`}>

                <div>
                    <Link onClick={(e) => goto(e, '/dashboard', 'home')} className="btm-link font-metromedium" to="">
                        <div>
                            <span className="chk-icon home">
                                <img src={`../../../images/icons/${lType === 'home' ? '' : 'd'}home.svg`} alt="icon"/>
                            </span>
                        </div>
                        <span style={{position: 'relative', top: '0px'}} className={`${lType === 'home' ? 'brand-green' : 'onsilver'}`}>Home</span>
                        
                    </Link>
                </div>

                <div>
                    <Link onClick={(e) => goto(e, '/dashboard/food-items', 'food')} className="btm-link font-metromedium" to="">
                        <div>
                            <span className="chk-icon food">
                                <img src={`../../../images/icons/${lType === 'food' ? '' : 'd'}food.svg`} alt="icon"/>
                            </span>
                        </div>
                        <span style={{position: 'relative', top: '0px'}} className={`${lType === 'food' ? 'brand-green' : 'onsilver'}`}>Food</span>
                        
                    </Link>
                </div>

                <div>
                    <Link onClick={(e) => goto(e, '/dashboard', 'order')} className="btm-link font-metromedium" to="">
                        <div>
                            <span className="chk-icon order">
                                <img src={`../../../images/icons/${lType === 'order' ? '' : 'd'}plate.svg`} alt="icon"/>
                            </span>
                        </div>
                        <span style={{position: 'relative', top: '0px'}} className={`${lType === 'order' ? 'brand-green' : 'onsilver'}`}>Orders</span>
                        
                    </Link>
                </div>

                <div>
                    <Link onClick={(e) => goto(e, '/dashboard/add-location', 'loc')} className="btm-link font-metromedium" to="">
                        <div>
                            <span className="chk-icon loc">
                                <img src={`../../../images/icons/${lType === 'loc' ? '' : 'd'}pin.svg`} alt="icon"/>
                            </span>
                        </div>
                        <span style={{position: 'relative', top: '0px'}} className={`${lType === 'loc' ? 'brand-green' : 'onsilver'}`}>Location</span>
                        
                    </Link>
                </div>

                <div>
                    <Link onClick={(e) => goto(e, '/dashboard', 'acct')} className="btm-link font-metromedium" to="">
                        <div>
                            <span className="chk-icon user">
                                <img src={`../../../images/icons/${lType === 'acct' ? '' : 'd'}user.svg`} alt="icon"/>
                            </span>
                        </div>
                        <span style={{position: 'relative', top: '0px'}} className={`${lType === 'acct' ? 'brand-green' : 'onsilver'}`}>Admins</span>
                        
                    </Link>
                </div>

            </div>

        </>
    )

}

export default BottomNav;