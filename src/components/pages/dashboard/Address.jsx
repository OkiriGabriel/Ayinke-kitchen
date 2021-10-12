import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';

import LocationContext from '../../../context/location/locationContext'
import AddressDetails from './AddressDetails'
import Placeholder from '../../layouts/partials/Placeholder';
import AddressContext from '../../../context/address/addressContext';

import * as moment from 'moment'

const Address = ({ address, loading, addresses }) => {

    const addressContext = useContext(AddressContext);

    const [show, setShow] = useState(false);
    const locationContext = useContext(LocationContext);
    const [openPop, steOpen] = useState(false);
    const [itemData, setItem] = useState(null);
        const eL = [1,2];

    useEffect(() => {
        
    }, []);

    const toggleOpen = (e) =>{
        if(e){
            e.preventDefault();
        }
        steOpen(!openPop)
    }

    const getLoc = (id) => {
        
        const loc = locationContext.locations.find((l) => l._id === id);
        return loc.name ? loc.name : '';
    }

    return (
        <>

            <div className="add d" >

                <div>
                    <div className="d-flex">
                        <p className="mrgb0">
                            <span className="fe fe-map-pin fs-12 brand-orange"></span>&nbsp;
                            <span className="text-muted fs-13">{ !loading ? getLoc(address.location) : '' } | {moment(address.createdAt).format('Do MMM, YYYY')}</span>
                        </p>
                    </div>
                    <p className="mrgb0 title fs-13 onmineshaft">
                        { address.address }
                    </p>
                </div>

                <div className="ml-auto ui-text-right">
                    <p className="mrgb0 title fs-13 brand-orange mt-1">
                        <Link onClick={toggleOpen} className="title fs-13 brand-orange">View Details</Link>
                    </p>
                    <p className="mrgb0 title fs-13 onmineshaft">
                        { '  ' }
                    </p>
                    <p className="mrgb0 title fs-12 onmineshaft mt-1">
                        { address.phoneNumber }
                    </p>
                </div>

                
            </div>

            <AddressDetails open={openPop} close={toggleOpen} address={address} addresses={addresses} locations={locationContext.locations} />
        </>
    )

}

export default Address