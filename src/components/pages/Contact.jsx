import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../layouts/partials/NavBar';


const Contact = (props) => {

    useEffect(() => {

       
        
    }, [])

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    return(
        <>

            <NavBar position={true} />

            <section className="hero home-hero ui-full-bg-norm" style={{backgroundImage: 'url("../../images/assets/img-two.jpg")'}}>
                <div className="container-fluid flex-height home">
                    <div className="ui-wrapper-small">

                        <div className="">

                            <div className="row heading-content">

                                <div className="col-md-7 mx-auto ui-text-center">
                                    
                                    <h1 className="headline onblack font-helveticabold fs-45 mrgt" style={{lineHeight: '52px'}}>
                                        We're excited to hear from you.
                                    </h1>

                                    <div class="onblack pdl2 pdr2 font-helveticamedium fs-18" style={{lineHeight: '24px'}}>
                                       Shoot us an email at theconcreap@gmail.com or contact us on our channels.
                                    </div>

                                     <div className="ui-group-button mrgt3">
                                         <a  href="mailto:theconcreap@gmail.com" className="btn btn-big bg-brandccred onwhite fs-16">Shoot Us an Email</a>
                                    </div>

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

                    </div>
                </div>
            </section>
            
        </>
    )

}

export default Contact;