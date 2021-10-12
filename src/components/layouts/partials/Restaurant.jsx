import React, { useEffect, useContext, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

import storage from '../../helpers/storage';

const Restaurant = ({ name, phone, restId, details, address, locations, logo, user }) => {

    const history = useHistory();

    useEffect(() => {
        
    }, []);

    const goTo = (e) => {
        e.preventDefault();

        if(user.username){
            localStorage.setItem('restaurant', user._id);
        }
        
        history.push(`/${restId}`) 
    }

    const toLoc = (id) => {
        const loc = locations.find((l) => l._id === id);
        return loc.name;
    }

    return(
        <>
            {/* <Link to="" onClick={(e) => goTo(e)}> */}
                
                <div className={`restaurant ${details && details === true ? 'details' : ''}`}>

                    <div onClick={(e) => goTo(e)} className="avatar">
                        {
                            logo && logo !== 'no-logo.jpg' &&
                            <img src={logo} alt="rest logo" />
                        }
                        {
                            (!logo || logo === 'no-logo.jpg') &&
                            <img src="../../../images/assets/avatar-bag.svg" alt="rest logo" />
                        }
                        
                    </div>

                    <div onClick={(e) => goTo(e)} className="details pdl">

                        <p className="title font-metromedium mt-2" style={{color: '#434a58'}}>{ name ? name : '' }</p>
                        <p className="loc loc-list">
                            {/* <span className="loc-add">
                                {address.address}, &nbsp;
                            </span> */}
                            <span className="text-muted font-metrolight fs-14"> { toLoc(address.location) }, Ogbomoso</span>
                        </p> 
                        {/* <p className="address">
                            <span>{ phone }</span>
                        </p> */}

                    </div>

                    <div className="ml-auto">

                        <div className="ui-group-button">
                            <a href={`tel: ${phone}`} style={{position: 'relative', right: '-4px'}}><span className="fe fe-phone onsilver fs-20"></span></a>
                            <Link to="" style={{position: 'relative', right: '-14px'}} onClick={(e) => goTo(e)}><span className="fe fe-chevron-right brand-orange fs-24"></span></Link> &nbsp; &nbsp;
                            
                        </div>

                    </div>

                </div>
            
            {/* </Link> */}
        </>
    )

}

export default Restaurant;