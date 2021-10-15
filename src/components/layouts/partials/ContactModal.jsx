import React, {useEffect, useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import {Modal} from 'react-bootstrap';

import LottiePlayer from '../../layouts/partials/LottiePlayer';
import lottieError from '../../_data/check-error.json'
import lottieSuccess from '../../_data/check-green.json'


const AlertModal = ({ isShow, closeModal, type, data }) => {


    const submit = async (e) => {
        e.preventDefault();
        closeModal();
    }


    return (
        <>

            <Modal show={isShow} 
                    onHide={closeModal} 
                    size="sm"
                    fade={false}
                    keyboard={false}
                    aria-labelledby="medium-modal"
                    centered
                    className="md--modal"
                >

                <Modal.Body>

                    <div className="d-flex ui-">

                        <div className="dm--dbx ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/bg@back-two.jpg  ")'}}>
                            <div className="dm--d">
                                {/* <div>
                                    <img src="../../../images/assets/icon@admodal.svg" alt="icon" />
                                </div> */}
                            </div>
                        </div>
                        <div className="dm--body">

                            <div className="d-flex align-items-center mrgb1">
                                {/* <h2 className="font-gilroymedium brandcox-firefly fs-18">
                                    Add Food Item
                                </h2> */}
                                <div className="ml-auto">
                                    <Link onClick={closeModal} className="dot-close fe-order" style={{ position: 'relative', top: '-2px' }}>
                                        <span className="fe fe-x brandcox-fireflydark fs-8"></span>
                                    </Link>
                                </div>
                            </div> 

                            <div className="dm--ct">
                                  
                                <h1 className="headline onblack font-helveticabold fs-35 mrgt" style={{lineHeight: '30px'}}>
                                    We're excited to hear from you.
                                </h1>
                                

                                <div class="onblack font-helveticamedium fs-18 mt-4" style={{lineHeight: '24px'}}>
                                Shoot us an email at AkinyemoKitchen@gmail.com or contact us on our channels.
                                </div>

                                <div className="ui-group-button mrgt3">
                                    <a  href="" className="btn btn-big bg-orange onwhite">Shoot Us an Email</a>
                                </div>

                                <p class="onblack font-helveticamedium fs-13 mt-4" style={{lineHeight: '24px'}}>If order related please visit our support clcik the ink below
                                
                                </p>
                                <Link to="/feedback">Feedback</Link>
                                <div className="mrgt3">

                                <ul class="social_media list-inline onwhite mrgt3">
                                    <li class="list-inline-item "><a href="https://www.instagram.com/concreap/" target="_blank" class="ig link-underlined hover"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
                                    <li class="list-inline-item"><a href="https://twitter.com/concreap" target="_blank" class="fb link-underlined hover"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
                                    <li class="list-inline-item"><a href="https://www.linkedin.com/company/concreap/" target="_blank" class="lkd link-underlined hover"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
                                </ul>

                                </div>
                            
                            </div>                                  
                        </div>
                    </div>
                    
                </Modal.Body>

            </Modal>
        

        </>

    )

}

export default AlertModal;