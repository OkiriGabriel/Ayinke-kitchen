import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import FoodContext from '../../../context/food/foodContext';
import Placeholder from '../../layouts/partials/Placeholder'

import FoodModal from './FoodModal'
import NumberModal from './NumberModal';
import UnameModal from './UnameModal';

const Details = ({ user, userLoading }) => {

    const [show, setShow] = useState(false);
    const [showU, setShowU] = useState(false);

    useEffect(() => {
        
    }, [])

    const toggleModal = (e) => {
        if(e){
            e.preventDefault();
        }
        setShow(!show);
    }

    const toggleUModal = (e) => {
        if(e){
            e.preventDefault();
        }
        setShowU(!showU);
    }

    

    return (
        <>
            <div className="mrgt2 det-boxa">

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Name</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">
                        {
                            userLoading &&
                            <Placeholder width="90px" />
                        }
                        {
                            !userLoading &&
                            <>{ user.resturantName ? user.resturantName : '' }</>
                        }
                        </p>
                    </div>

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Username</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">
                            {
                                userLoading &&
                                <Placeholder width="40px" />
                            }
                            {
                                !userLoading &&
                                <>{ 
                                    user.username ? 
                                    (
                                        <>
                                            { user.username } &nbsp; &nbsp;
                                            <Link onClick={(e) => toggleUModal(e)} ><span className="fe fe-edit-3 brand-orange"></span></Link>
                                        </>
                                    ) : 
                                    (<>
                                        <Link onClick={(e) => toggleUModal(e)}><span className="fe fe-plus brand-orange"></span></Link>
                                    </>) 
                                }</>
                            }
                        </p>
                    </div>

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Email</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">
                            {
                                userLoading &&
                                <Placeholder width="90px" />
                            }
                            {
                                !userLoading &&
                                <>{ user.email ? user.email : '' }</>
                            }
                        </p>
                    </div>

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Phone number</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">
                            {
                                userLoading &&
                                <Placeholder width="120px" />
                            }
                            {
                                !userLoading &&
                                <>{ user.phoneNumber ? user.phoneNumber : '' }</>
                            }
                        </p>
                    </div>

                    {/* <div className="ui-line bg-silverlight"></div> */}

                    {/* <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Food items</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">
                            {
                                userLoading &&
                                <Placeholder width="40px" />
                            }
                            {
                                !userLoading &&
                                <>{ user.foodItems ? user.foodItems.length : '' }</>
                            }
                        </p>
                    </div> */}

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Addresses</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">
                            {
                                userLoading &&
                                <Placeholder width="40px" />
                            }
                            {
                                !userLoading &&
                                <>{ user.addresses ? user.addresses.length : '' }</>
                            }
                        </p>
                    </div>

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Whatsapp No.</p>
                        <p className="mrgb0 font-weight-bold text-muted fs-15 ml-auto">
                            {
                                userLoading &&
                                <Placeholder width="40px" />
                            }
                            {
                                !userLoading &&
                                <>{ 
                                    user.whatsappNumber ? 
                                    (
                                        <>
                                            { user.whatsappNumber } &nbsp; &nbsp;
                                            <Link onClick={(e) => toggleModal(e)} ><span className="fe fe-edit-3 brand-orange"></span></Link>
                                        </>
                                    ) : 
                                    (<>
                                        <Link onClick={(e) => toggleModal(e)}><span className="fe fe-plus brand-orange"></span></Link>
                                    </>) 
                                }</>
                            }
                        </p>
                    </div>

                    <div className="ui-line bg-silverlight"></div>

                    <div className="d-flex align-items-center">
                        <p className="mrgb0 font-weight-medium onmineshaft fs-15">Subscription</p>
                        <p className={`mrgb0 font-weight-bold ${user.isActive ? 'onapple' : 'onaliz'} fs-15 ml-auto`}>
                            {
                                userLoading &&
                                <Placeholder width="60px" />
                            }
                            {
                                !userLoading &&
                                <>{ user.isActive ? 'Active' : 'Inactive' }</>
                            }
                        </p>
                    </div>


                </div>

                <NumberModal isShow={show} closeModal={toggleModal} user={user} />
                <UnameModal isShow={showU} closeModal={toggleUModal} user={user} />
            
        </>
    )

}

export default Details