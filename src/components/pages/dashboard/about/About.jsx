import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios'

import TopBar from '../TopBar'
import GoBack from '../GoBack'

import colors from '../../../helpers/colors'
import body from '../../../helpers/body'
import storage from '../../../helpers/storage'

import UserContext from '../../../../context/user/userContext'


const About = (props) => {

    const userContext = useContext(UserContext);

    useEffect(async () => {

        fetchDefaults();

    }, []);

    const fetchDefaults = async () => {

        if(storage.checkToken()){
            userContext.getUser();
         }

    }


    return(
        <>
            <TopBar userLoading={userContext.loading} user={userContext.user} />

            <section className="ui-full-bg-norm disp-box-wrapper" style={{backgroundImage: 'url("../../../images/assets/foopat.svg")'}}>

                <div className="container">

                   <div className="disp-box ui-text-center">

                        <div className="icon-circle about mrgt2 mrgb3" style={{backgroundColor: `${colors.randomBgAccents()}`}}>
                            <img src={`../../../images/assets/disp@we.png`} alt="disp_icon" />
                        </div>

                        <h3 className="font-metrobold fs-18" style={{color: colors.primary.green}}>About Checkaam</h3>

                        <div className="abt-body">

                            <p className="font-metromedium fs-15 mrgb3" style={{color: colors.primary.green}}>

                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

                            </p>
                            

                        </div>

                   </div>

                </div>

            </section>

            <GoBack buttonText="Go Back" />
            
        </>
    )

}

export default About;