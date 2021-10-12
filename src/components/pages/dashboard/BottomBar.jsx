import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'


const BottomBar = () => {

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        
        setDefaultActive();

    }, [])

    const setDefaultActive = () => {

        if(location.pathname === '/dashboard'){
            toggleActive('link-one');
        }

        if(location.pathname === '/dashboard/account'){
            toggleActive('link-two');
        }


    }

    const toggleActive = async(t) => {

        const links = document.querySelectorAll('.bar-item a');
        const d = document.getElementById(t);

        await links.forEach((e) => {
            if(e.classList.contains('active')){
                e.classList.remove('active')
            }
        });

        if(d){
            d.classList.add('active');
        }
        
    }

    const goTo = (e, t, uri) => {

        if(e){
            e.preventDefault();
        }

        toggleActive(t);

        if(uri){
            history.push(uri);
        }

    }


    return (
        <>

            <footer>
                <div id="bottom-bar" className="bottom-bar">

                    <div className="bar-item">
                        <Link onClick={(e) => goTo(e, 'link-one', '/dashboard')} to="" className="active" id="link-one">
                            <span className="ca-food-plate food-icon"></span>
                            <span className="font-gilroymedium fs-16">Food Items</span>
                        </Link>
                    </div>
                    <div className="divider"></div>
                    <div className="bar-item">
                        <Link onClick={(e) => goTo(e, 'link-two', '/dashboard/account')} to="" id="link-two">
                            <span className="ca-user user-icon"></span>
                            <span className="font-gilroymedium fs-16">Account</span>
                        </Link>
                    </div>

                </div>
            </footer>

        </>

    )

}

export default BottomBar;