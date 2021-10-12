import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'


const BottomNav = () => {

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        
        

    }, [])

    
    const goBack = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <>

            <footer>
                <div id="bottom-bar" className="bottom-bar page">

                    <div className="bar-item">
                        <Link onClick={(e) => goBack(e)} to="">
                            <span className="fe fe-arrow-left brand-orange"></span> &nbsp;
                            <span className="font-weight-bold brand-orange fs-16">Go Back</span>
                        </Link>
                    </div>
                    {/* <div className="divider"></div>
                    <div className="bar-item">
                        <Link onClick={(e) => goTo(e, 'link-two', '/dashboard/account')} to="" id="link-two">
                            <span className="ca-user user-icon"></span>
                            <span className="font-gilroymedium fs-16">Account</span>
                        </Link>
                    </div> */}

                </div>
            </footer>

        </>

    )

}

export default BottomNav;